import type {
  CreateMyBookHistoryPayload,
  DeleteMyBookHistoryPayload,
  GetMyBookHistoriesPayload,
  UpdateMyBookHistoryPayload,
} from './interface';
import { MyBookHistory, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/common/logger/logger.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NoFieldsToUpdateException } from 'src/common/exceptions';
import {
  MyBookHistoryForbiddenAccessException,
  NotFoundMyBookHistoryException,
} from './exceptions';
import { MyBookForbiddenAccessException, NotFoundMyBookException } from 'src/my-book/exceptions';

@Injectable()
export class MyBookHistoryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(MyBookHistoryService.name);
  }

  /**
   * * 새로운 독서 기록을 생성합니다.
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

    await this.validateMyBookOwnerShip(myBookId, userId);

    const myBookHistory = await this.prismaService.myBookHistory.create({
      data: {
        myBookId,
        ...rest,
      },
    });

    return myBookHistory;
  }

  /**
   * * 특정 도서의 모든 독서 기록을 조회합니다.
   *
   * @param {GetMyBookHistoriesPayload} payload - 도서 읽기 기록 조회에 필요한 데이터
   * @param {number} payload.id - MyBook ID
   * @param {number} payload.userId - 사용자 ID
   * @returns {Promise<MyBookHistory[]>} 도서 읽기 기록 목록
   */
  public async getMyBookHistories(payload: GetMyBookHistoriesPayload): Promise<MyBookHistory[]> {
    const { myBookId, userId } = payload;

    await this.validateMyBookOwnerShip(myBookId, userId);
    const where: Prisma.MyBookHistoryWhereInput = { myBookId };

    const myBookHistories: MyBookHistory[] = await this.prismaService.myBookHistory.findMany({
      where,
    });

    return myBookHistories;
  }

  /**
   * * 독서 기록을 수정합니다.
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
    const { id, userId, ...updatePayload } = payload;
    const { date, memo, endTime, endPage, startPage, startTime, readingMood, readingMinutes } =
      updatePayload;

    // 해당 ID를 가진 history가 있는지 확인
    await this.validateHistoryOwnership(id, userId);

    const where: Prisma.MyBookHistoryWhereUniqueInput = { id };
    const data: Prisma.MyBookHistoryUpdateInput = {
      ...(date !== undefined && { date }),
      ...(memo !== undefined && { memo }),
      ...(endTime !== undefined && { endTime }),
      ...(endPage !== undefined && { endPage }),
      ...(startTime !== undefined && { startTime }),
      ...(startPage !== undefined && { startPage }),
      ...(readingMood !== undefined && { readingMood }),
      ...(readingMinutes !== undefined && { readingMinutes }),
    };

    // 업데이트 필드 존재하는지 확인
    if (Object.keys(data).length === 0) {
      throw new NoFieldsToUpdateException();
    }

    // 업데이트
    const updateMyBookHistory: MyBookHistory = await this.prismaService.myBookHistory.update({
      where,
      data,
    });

    return updateMyBookHistory;
  }

  /**
   * * 도서 읽기 기록을 삭제합니다.
   *
   * @param {DeleteMyBookHistoryPayload} payload - 도서 읽기 기록 삭제에 필요한 데이터
   * @param {number} payload.id - 삭제할 MyBookHistory ID
   * @param {number} payload.userId - 사용자 ID
   * @returns {Promise<MyBookHistory>} 삭제된 도서 읽기 기록
   */
  public async deleteMyBookHistory(payload: DeleteMyBookHistoryPayload): Promise<MyBookHistory> {
    const { id, userId } = payload;

    await this.validateMyBookOwnerShip(id, userId);
    const where: Prisma.MyBookHistoryWhereUniqueInput = { id };
    const deleteMyBookHistory = await this.prismaService.myBookHistory.delete({
      where,
    });

    return deleteMyBookHistory;
  }

  /**
   * * 주어진 MyBook ID가 존재하는지, 그리고 해당 사용자의 소유인지 확인합니다.
   * * 소유권이 없거나 MyBook이 존재하지 않으면 예외를 던집니다.
   *
   * @param {number} myBookId - 확인할 MyBook의 ID
   * @param {number} userId - 작업을 요청한 사용자의 ID
   * @private
   * @throws {NotFoundMyBookException} MyBook 리소스가 존재하지 않을 때
   * @throws {MyBookForbiddenAccessException} MyBook 리소스는 존재하지만 소유권이 없을 때
   */
  private async validateMyBookOwnerShip(myBookId: number, userId: number) {
    try {
      await this.prismaService.myBook.findUniqueOrThrow({
        where: { id: myBookId, userId },
        select: { id: true },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
        const existMyBook = await this.prismaService.myBook.findUnique({
          where: { id: myBookId },
          select: { id: true, userId: true },
        });

        if (existMyBook) {
          const ownerId = existMyBook.userId;
          throw new MyBookForbiddenAccessException({ myBookId, ownerId, userId });
        } else {
          throw new NotFoundMyBookException(myBookId);
        }
      }
    }
  }

  /**
   * * 주어진 MyBookHistory ID가 존재하는지, 그리고 연관된 MyBook이 해당 사용자의 소유인지 확인합니다.
   * * 소유권이 없거나 History가 존재하지 않으면 예외를 던집니다.
   *
   * @param {number} myBookHistoryId - 확인할 MyBookHistory의 ID
   * @param {number} userId - 작업을 요청한 사용자의 ID
   * @private
   * @throws {NotFoundMyBookHistoryException} History 리소스가 존재하지 않을 때
   * @throws {MyBookHistoryForbiddenAccessException} History는 존재하지만 소유권이 없을 때
   */
  private async validateHistoryOwnership(myBookHistoryId: number, userId: number) {
    const history = await this.prismaService.myBookHistory.findUnique({
      where: { id: myBookHistoryId },
      select: {
        id: true,
        myBook: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!history) {
      throw new NotFoundMyBookHistoryException(myBookHistoryId);
    } else {
      const ownerId = history.myBook.userId;

      if (ownerId !== userId) {
        throw new MyBookHistoryForbiddenAccessException({ myBookHistoryId, ownerId, userId });
      }
    }
  }
}
