import type {
  CreateMyBookHistoryPayload,
  DeleteMyBookHistoryPayload,
  GetMyBookHistoriesPayload,
  UpdateMyBookHistoryPayload,
} from './interface';
import { MyBookHistory } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/common/logger/logger.service';
import { MyBookService } from 'src/my-book/my-book.service';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * 도서 읽기 기록 관리를 위한 서비스
 * 사용자의 책 읽기 이력을 생성, 조회, 수정, 삭제하는 기능을 제공합니다.
 */
@Injectable()
export class MyBookHistoryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly myBookService: MyBookService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(MyBookHistoryService.name);
  }

  /**
   * 새로운 도서 읽기 기록을 생성합니다.
   *
   * @param {CreateMyBookHistoryPayload} payload - 도서 읽기 기록 생성에 필요한 데이터
   * @param {number} payload.userId - 사용자 ID
   * @param {number} payload.myBookId - MyBook ID
   * @param {Date} payload.date - 읽은 날짜
   * @param {number} [payload.startPage] - 시작 페이지
   * @param {number} [payload.endPage] - 종료 페이지
   * @param {string} [payload.memo] - 메모
   * @param {ReadingMood} payload.readingMood - 읽기 기분
   * @returns {Promise<MyBookHistory>} 생성된 도서 읽기 기록
   */
  public async createMyBookHistory(payload: CreateMyBookHistoryPayload): Promise<MyBookHistory> {
    const { userId, myBookId, ...rest } = payload;
    this.logger.log(`도서 읽기 기록 생성 시작: 사용자 ID ${userId}, 도서 ID ${myBookId}`);

    const myBook = await this.myBookService.validateMyBook({
      id: myBookId,
      userId,
    });

    const myBookHistory = await this.prismaService.myBookHistory.create({
      data: {
        myBookId: myBook.id,
        ...rest,
      },
    });

    this.logger.log(`도서 읽기 기록 생성 완료: ID ${myBookHistory.id}`);
    return myBookHistory;
  }

  /**
   * 특정 도서의 모든 읽기 기록을 조회합니다.
   *
   * @param {GetMyBookHistoriesPayload} payload - 도서 읽기 기록 조회에 필요한 데이터
   * @param {number} payload.id - MyBook ID
   * @param {number} payload.userId - 사용자 ID
   * @returns {Promise<MyBookHistory[]>} 도서 읽기 기록 목록
   */
  public async getMyBookHistories(payload: GetMyBookHistoriesPayload): Promise<MyBookHistory[]> {
    const { id, userId } = payload;
    this.logger.log(`도서 읽기 기록 목록 조회: 도서 ID ${id}, 사용자 ID ${userId}`);

    const myBook = await this.myBookService.validateMyBook({
      id,
      userId,
    });

    const myBookHistories = await this.prismaService.myBookHistory.findMany({
      where: {
        myBookId: myBook.id,
      },
    });

    this.logger.log(`도서 읽기 기록 목록 조회 완료: ${myBookHistories.length}개 기록 조회됨`);
    return myBookHistories;
  }

  /**
   * 도서 읽기 기록을 수정합니다.
   *
   * @param {UpdateMyBookHistoryPayload} payload - 도서 읽기 기록 수정에 필요한 데이터
   * @param {number} payload.id - 수정할 MyBookHistory ID
   * @param {number} payload.userId - 사용자 ID
   * @param {Date} [payload.date] - 읽은 날짜
   * @param {number} [payload.startPage] - 시작 페이지
   * @param {number} [payload.endPage] - 종료 페이지
   * @param {string} [payload.memo] - 메모
   * @param {ReadingMood} [payload.readingMood] - 읽기 기분
   * @returns {Promise<MyBookHistory>} 수정된 도서 읽기 기록
   */
  public async updateMyBookHistory(payload: UpdateMyBookHistoryPayload): Promise<MyBookHistory> {
    const { id, userId, ...rest } = payload;
    this.logger.log(`도서 읽기 기록 수정: ID ${id}, 사용자 ID ${userId}`);

    const myBook = await this.myBookService.validateMyBook({
      id,
      userId,
    });

    const updateMyBookHistory = await this.prismaService.myBookHistory.update({
      where: {
        id: myBook.id,
      },
      data: {
        ...rest,
      },
    });

    this.logger.log(`도서 읽기 기록 수정 완료: ID ${updateMyBookHistory.id}`);
    return updateMyBookHistory;
  }

  /**
   * 도서 읽기 기록을 삭제합니다.
   *
   * @param {DeleteMyBookHistoryPayload} payload - 도서 읽기 기록 삭제에 필요한 데이터
   * @param {number} payload.id - 삭제할 MyBookHistory ID
   * @param {number} payload.userId - 사용자 ID
   * @returns {Promise<MyBookHistory>} 삭제된 도서 읽기 기록
   */
  public async deleteMyBookHistory(payload: DeleteMyBookHistoryPayload): Promise<MyBookHistory> {
    const { id, userId } = payload;
    this.logger.log(`도서 읽기 기록 삭제: ID ${id}, 사용자 ID ${userId}`);

    const myBook = await this.myBookService.validateMyBook({ id, userId });

    const deleteMyBookHistory = await this.prismaService.myBookHistory.delete({
      where: {
        id: myBook.id,
      },
    });

    this.logger.log(`도서 읽기 기록 삭제 완료: ID ${deleteMyBookHistory.id}`);
    return deleteMyBookHistory;
  }
}
