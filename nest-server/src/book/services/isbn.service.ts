import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggerService } from 'src/common/logger/logger.service';
import { normalizedISBN, validateISBN } from 'src/common/utils/isbn.util';
import { EmptyIsbnListException, InvalidIsbnFormatException } from '../exceptions';
import { CreateISBNPayload } from '../interface';

@Injectable()
export class ISBNService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(ISBNService.name);
  }

  /**
   * * 여러 ISBN 코드를 검증하고 특정 도서에 연결(또는 생성 후 연결)합니다.
   * @description
   * - 주로 BookService의 책 등록 트랜잭션 내에서 사용됩니다.
   * - 이미 존재하는 ISBN은 주어진 bookId로 재연결될 수 있습니다.
   * @param prisma - Prisma 트랜잭션 클라이언트
   * @param {CreateISBNPayload} payload - ISBN 코드 배열과 연결할 bookId를 포함하는 객체
   * @returns {Promise<void>} 생성 및 업데이트(재연결)된 레코드 수
   * @throws {EmptyIsbnListException} ISBN 코드 배열이 비어있는 경우
   * @throws {InvalidIsbnFormatException} 유효하지 않은 ISBN 코드가 포함된 경우
   * @throws {Prisma.PrismaClientKnownRequestError | Error} createMany 또는 updateMany 실행 중 발생하는 DB 오류 (전역 필터에서 처리)
   */
  public async createISBNs(
    prisma: Prisma.TransactionClient,
    payload: CreateISBNPayload,
  ): Promise<void> {
    const { isbns, bookId } = payload;
    this.logger.debug(`${isbns.length}개의 ISBN 생성/연결 요청 for Book ID: ${bookId}`);

    // --- 단계 1: 입력값 유효성 검사 및 사전 처리 (커스텀 Exception 적용) ---
    if (!isbns || isbns.length === 0) {
      this.logger.warn('ISBN 생성/연결 실패: ISBN 코드가 제공되지 않았습니다.');
      throw new EmptyIsbnListException();
    }

    const normalizedCodes = isbns.map((code) => {
      if (!validateISBN(code)) {
        this.logger.warn(`유효하지 않은 ISBN 코드 포함: ${code}`);
        throw new InvalidIsbnFormatException(code);
      }
      return normalizedISBN(code);
    });
    const uniqueNormalizedCodes = [...new Set(normalizedCodes)];

    // --- 단계 2: 이미 DB에 존재하는 ISBN 코드 확인 ---
    const existingISBNs = await prisma.iSBN.findMany({
      where: { code: { in: uniqueNormalizedCodes } },
      select: { code: true },
    });
    const existingCodesSet = new Set(existingISBNs.map((isbn) => isbn.code));

    // --- 단계 3: 생성할 코드와 업데이트할 코드 분류 ---
    const codesToCreate = uniqueNormalizedCodes.filter((code) => !existingCodesSet.has(code));
    const codesToUpdate = uniqueNormalizedCodes.filter((code) => existingCodesSet.has(code));

    let createdCount = 0;
    let updatedCount = 0;

    // --- 단계 4: 기존 ISBN 레코드들의 bookId 업데이트 (Batch Update) ---
    if (codesToUpdate.length > 0) {
      // 여기서 발생하는 DB 오류는 상위로 전파되어 트랜잭션 롤백 및 전역 필터 처리
      const updateResult = await prisma.iSBN.updateMany({
        where: { code: { in: codesToUpdate } },
        data: { bookId },
      });
      updatedCount = updateResult.count;
      this.logger.debug(`기존 ISBN ${updatedCount}개 Book ID(${bookId}) 업데이트 완료`);
    }

    // --- 단계 5: 새로운 ISBN 레코드 생성 (Batch Create) ---
    if (codesToCreate.length > 0) {
      const isbnDataToCreate = codesToCreate.map((code) => ({
        code,
        bookId,
      }));
      // 여기서 발생하는 DB 오류는 상위로 전파되어 트랜잭션 롤백 및 전역 필터 처리
      const createResult = await prisma.iSBN.createMany({
        data: isbnDataToCreate,
        skipDuplicates: true,
      });
      createdCount = createResult.count;
      this.logger.debug(`${createdCount}개의 새 ISBN 생성 완료 (Book ID: ${bookId})`);
    }
  }

  public async remove(payload: Prisma.ISBNWhereUniqueInput) {
    return await this.prismaService.iSBN.delete({
      where: payload,
    });
  }
}
