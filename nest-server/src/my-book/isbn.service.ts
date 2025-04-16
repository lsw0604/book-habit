import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoggerService } from 'src/common/logger/logger.service';
import { ISBN, Prisma, Book } from '@prisma/client'; // Book 타입 추가

/**
 * ISBN(International Standard Book Number) 관리를 위한 서비스입니다.
 * @description
 * - ISBN 코드의 유효성을 검증하고, 책 등록 시 ISBN을 생성 및 연결하며,
 * 관련 정보를 조회하고, 잘못된 데이터를 삭제하는 기능을 제공합니다.
 * - ISBN 코드 자체는 불변성을 가지므로 수정 기능은 제공하지 않습니다.
 * - (연결된 Book 변경이 필요하다면 삭제 후 재등록/재연결을 권장)
 */
@Injectable()
export class ISBNService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(ISBNService.name);
  }

  /**
   * 여러 ISBN 코드를 검증하고 특정 도서에 연결(또는 생성 후 연결)합니다.
   * 주로 BookService의 책 등록 트랜잭션 내에서 사용됩니다.
   * 이미 존재하는 ISBN은 주어진 bookId로 재연결될 수 있습니다.
   *
   * @param prisma - Prisma 트랜잭션 클라이언트
   * @param isbnCodes - 처리할 ISBN 코드 배열
   * @param bookId - 연결할 도서 ID
   * @returns {Promise<{ createdCount: number; updatedCount: number }>} 생성 및 업데이트(재연결)된 레코드 수
   * @throws {BadRequestException} ISBN 코드가 비어있거나 유효하지 않은 코드가 포함된 경우
   */
  public async createISBNs(
    prisma: Prisma.TransactionClient,
    isbnCodes: string[],
    bookId: number,
  ): Promise<{ createdCount: number; updatedCount: number }> {
    this.logger.debug(`${isbnCodes.length}개의 ISBN 생성/연결 요청 for Book ID: ${bookId}`);

    if (!isbnCodes || isbnCodes.length === 0) {
      this.logger.warn('ISBN 생성/연결 실패: ISBN 코드가 제공되지 않았습니다.');
      throw new BadRequestException('ISBN은 반드시 한개 이상 필요합니다.');
    }

    // 모든 ISBN 코드 유효성 검사 및 정규화
    const normalizedCodes = isbnCodes.map((code) => {
      if (!this.validateISBN(code)) {
        // Use the public validator
        this.logger.warn(`유효하지 않은 ISBN 코드 포함: ${code}`);
        throw new BadRequestException(`유효하지 않은 ISBN 코드가 포함되어 있습니다: ${code}`);
      }
      return this.normalizeISBN(code);
    });
    const uniqueNormalizedCodes = [...new Set(normalizedCodes)];

    // 이미 존재하는 ISBN 코드 확인
    const existingISBNs = await prisma.iSBN.findMany({
      where: {
        code: {
          in: uniqueNormalizedCodes,
        },
      },
      select: { code: true },
    });
    const existingCodesSet = new Set(existingISBNs.map((isbn) => isbn.code));

    const codesToCreate = uniqueNormalizedCodes.filter((code) => !existingCodesSet.has(code));
    const codesToUpdate = uniqueNormalizedCodes.filter((code) => existingCodesSet.has(code));

    let createdCount = 0;
    let updatedCount = 0;

    // 1. 기존 ISBN 업데이트 (bookId 재연결, updateMany 사용)
    if (codesToUpdate.length > 0) {
      const updateResult = await prisma.iSBN.updateMany({
        where: {
          code: { in: codesToUpdate },
        },
        data: { bookId },
      });
      updatedCount = updateResult.count;
      this.logger.debug(`기존 ISBN ${updatedCount}개 Book ID(${bookId}) 업데이트 완료`);
    }

    // 2. 새 ISBN 생성 (createMany 사용)
    if (codesToCreate.length > 0) {
      const isbnDataToCreate = codesToCreate.map((code) => ({
        code,
        bookId,
      }));
      const createResult = await prisma.iSBN.createMany({
        data: isbnDataToCreate,
        skipDuplicates: true, // 혹시 모를 동시성 문제 방지
      });
      createdCount = createResult.count;
      this.logger.debug(`${createdCount}개의 새 ISBN 생성 완료 (Book ID: ${bookId})`);
    }

    return { createdCount, updatedCount };
  }

  /**
   * 단일 ISBN 코드를 검증하고 특정 도서와 연결(또는 생성 후 연결)합니다.
   * 이미 존재하는 ISBN인 경우에도 주어진 도서 ID로 재연결합니다.
   * 트랜잭션 내에서 사용될 수 있도록 prisma 클라이언트를 인자로 받습니다.
   *
   * @param prisma - Prisma 트랜잭션 클라이언트
   * @param code - ISBN 코드 (유효성 검사 수행)
   * @param bookId - 연결할 도서 ID
   * @returns {Promise<ISBN>} 찾거나 생성/연결된 ISBN 객체
   * @throws {BadRequestException} ISBN 코드가 유효하지 않은 경우
   */
  public async findOrCreateISBN(
    prisma: Prisma.TransactionClient,
    code: string,
    bookId: number,
  ): Promise<ISBN> {
    this.logger.debug(`[Upsert] ISBN 검색 또는 생성/연결 시도: ${code} for Book ID: ${bookId}`);

    if (!this.validateISBN(code)) {
      // Use the public validator
      this.logger.warn(`유효하지 않은 ISBN 코드: ${code}`);
      throw new BadRequestException(`유효하지 않은 ISBN 코드입니다: ${code}`);
    }
    const normalizedCode = this.normalizeISBN(code);

    const isbn = await prisma.iSBN.upsert({
      where: { code: normalizedCode },
      create: {
        code: normalizedCode,
        bookId,
      },
      update: {
        bookId, // ISBN이 이미 존재하면 이 책 ID로 재연결
      },
    });

    this.logger.debug(
      `[Upsert] ISBN 처리 완료: ${normalizedCode} (ID: ${isbn.id}) 연결된 Book ID: ${isbn.bookId}`,
    );
    return isbn;
  }

  /**
   * ISBN 코드 배열로 해당 ISBN을 가진 첫 번째 도서를 검색합니다.
   * @param isbnCodes - 검색할 ISBN 코드 배열
   * @returns {Promise<Book | null>} 도서 정보 (도서를 찾지 못한 경우 null)
   */
  public async findBookByISBN(isbnCodes: string[]): Promise<Book | null> {
    this.logger.debug(`ISBN으로 도서 검색 시도: ${isbnCodes.join(', ')}`);
    if (!isbnCodes || isbnCodes.length === 0) return null;

    const normalizedCodes = isbnCodes.map((code) => this.normalizeISBN(code));

    // 여기서는 Book 엔티티만 반환하도록 수정 (관계 포함은 BookService 담당)
    const book = await this.prismaService.book.findFirst({
      where: {
        isbns: {
          some: {
            code: {
              in: normalizedCodes,
            },
          },
        },
      },
      // BookService에서 관계를 포함하여 조회하는 것이 더 적합할 수 있음
      // include: { ... } 부분 제거 또는 최소화
    });

    if (book) {
      this.logger.debug(`ISBN으로 도서 검색 성공: ID ${book.id}, 제목 "${book.title}"`);
    } else {
      this.logger.debug(`ISBN으로 도서를 찾을 수 없음: ${isbnCodes.join(', ')}`);
    }

    return book;
  }

  /**
   * 특정 도서 ID에 연결된 모든 ISBN 레코드를 조회합니다.
   * @param bookId - 조회할 도서 ID
   * @returns {Promise<ISBN[]>} ISBN 목록
   */
  public async getISBNsByBookId(bookId: number): Promise<ISBN[]> {
    this.logger.debug(`도서 ID ${bookId}의 ISBN 목록 조회 요청`);
    if (!bookId) return [];

    const isbns = await this.prismaService.iSBN.findMany({
      where: { bookId },
    });

    this.logger.debug(`도서 ID ${bookId}의 ISBN ${isbns.length}개 조회 완료`);
    return isbns;
  }

  /**
   * ISBN을 ID로 조회합니다.
   * @param id - 조회할 ISBN ID
   * @returns {Promise<ISBN | null>} ISBN 객체 또는 null (찾지 못한 경우)
   */
  public async findOneById(id: number): Promise<ISBN | null> {
    this.logger.debug(`ID로 ISBN 조회 요청: ${id}`);
    if (!id) return null;

    const isbn = await this.prismaService.iSBN.findUnique({
      where: { id },
    });

    if (!isbn) {
      this.logger.warn(`ID(${id})에 해당하는 ISBN을 찾을 수 없습니다.`);
    }
    return isbn;
  }

  /**
   * ISBN을 코드로 조회합니다. (정규화된 코드로 검색)
   * @param code - 조회할 ISBN 코드
   * @returns {Promise<ISBN | null>} ISBN 객체 또는 null (찾지 못한 경우)
   */
  public async findOneByCode(code: string): Promise<ISBN | null> {
    if (!code) return null;
    const normalizedCode = this.normalizeISBN(code);
    this.logger.debug(`코드로 ISBN 조회 요청: ${normalizedCode}`);

    const isbn = await this.prismaService.iSBN.findUnique({
      where: { code: normalizedCode },
    });

    if (!isbn) {
      this.logger.warn(`코드(${normalizedCode})에 해당하는 ISBN을 찾을 수 없습니다.`);
    }
    return isbn;
  }

  /**
   * 특정 ISBN 레코드를 삭제합니다.
   * 주로 잘못 입력된 데이터를 정리할 때 사용합니다.
   *
   * @param id - 삭제할 ISBN 레코드의 ID
   * @returns {Promise<ISBN>} 삭제된 ISBN 객체
   * @throws {NotFoundException} 해당 ID의 ISBN 레코드를 찾을 수 없는 경우
   */
  public async remove(id: number): Promise<ISBN> {
    this.logger.debug(`ISBN 삭제 요청: ID ${id}`);

    // 삭제 전 존재 여부 확인 (P2025 에러를 더 명확한 NotFoundException으로 변환)
    try {
      const deletedISBN = await this.prismaService.iSBN.delete({
        where: { id },
      });
      this.logger.debug(`ISBN 삭제 완료: ID ${id}, 코드 ${deletedISBN.code}`);
      return deletedISBN;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        const errorMessage = (error.meta?.cause as string) ?? `Record to delete not found.`;
        this.logger.warn(`ISBN 삭제 실패(ID: ${id}): ${errorMessage}`);
        throw new NotFoundException(`삭제할 ISBN ID(${id})를 찾을 수 없습니다.`);
      }
      this.logger.error(`ISBN 삭제(ID: ${id}) 중 오류 발생: ${error.message}`, error.stack);
      throw error;
    }
  }

  // --- Public 유틸리티 메서드 ---

  /**
   * ISBN 코드의 유효성을 검사합니다 (형식 및 체크섬).
   * 외부에서도 ISBN 유효성 검사가 필요할 때 사용할 수 있습니다.
   * @param code - 검사할 ISBN 코드
   * @returns {boolean} 유효성 여부
   */
  public validateISBN(code: string): boolean {
    if (!code) return false; // Null 또는 빈 문자열 처리
    const normalizedCode = this.normalizeISBN(code);

    if (normalizedCode.length === 10) {
      return this.isValidISBN10(normalizedCode);
    } else if (normalizedCode.length === 13) {
      return this.isValidISBN13(normalizedCode);
    } else {
      // 유효하지 않은 길이는 로그를 남기지 않거나 debug 레벨로 남길 수 있음
      // this.logger.debug(`유효하지 않은 ISBN 길이: ${normalizedCode} (길이: ${normalizedCode.length})`);
      return false;
    }
  }

  // --- Private 유틸리티 메서드 ---

  /**
   * ISBN 코드를 정규화합니다 (하이픈 제거 및 대문자 변환).
   * @param code - 원본 ISBN 코드
   * @returns {string} 정규화된 ISBN 코드
   */
  private normalizeISBN(code: string): string {
    return code.replace(/-/g, '').toUpperCase();
  }

  /**
   * ISBN-10 체크섬 유효성을 검사합니다.
   * @param isbn10 - 10자리 정규화된 ISBN 코드 (숫자 9 + 체크 문자(숫자 또는 X))
   * @returns {boolean} 유효성 여부
   */
  private isValidISBN10(isbn10: string): boolean {
    if (!/^[0-9]{9}[0-9X]$/.test(isbn10)) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      // charCodeAt 사용이 parseInt보다 약간 더 빠를 수 있음
      const digit = isbn10.charCodeAt(i) - 48; // '0'의 charCode는 48
      if (digit < 0 || digit > 9) return false; // 숫자가 아닌 경우 방지
      sum += digit * (10 - i);
    }

    const lastChar = isbn10[9];
    const checkDigit = lastChar === 'X' ? 10 : lastChar.charCodeAt(0) - 48;
    if (checkDigit < 0 || checkDigit > 10) return false; // 유효한 체크 숫자 범위 확인

    sum += checkDigit;

    return sum % 11 === 0;
  }

  /**
   * ISBN-13 체크섬 유효성을 검사합니다.
   * @param isbn13 - 13자리 정규화된 ISBN 코드 (숫자 13개)
   * @returns {boolean} 유효성 여부
   */
  private isValidISBN13(isbn13: string): boolean {
    if (!/^[0-9]{13}$/.test(isbn13)) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 12; i++) {
      const digit = isbn13.charCodeAt(i) - 48; // '0'의 charCode는 48
      if (digit < 0 || digit > 9) return false; // 숫자가 아닌 경우 방지
      sum += digit * (i % 2 === 0 ? 1 : 3);
    }

    const checkDigitCalculated = (10 - (sum % 10)) % 10;
    const lastDigit = isbn13.charCodeAt(12) - 48;

    return checkDigitCalculated === lastDigit;
  }
}
