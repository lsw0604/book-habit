import type {
  CreateMyBookReviewPayload,
  GetMyBookReviewPayload,
  UpdateMyBookReviewPayload,
  DeleteMyBooKReviewResponse,
  DeleteMyBookReviewPayload,
  FormattedMyBookReview,
} from './interface';

import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/common/logger/logger.service';
import { MyBookService } from 'src/my-book/my-book.service';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AlreadyExistMyBookReviewException,
  NoFieldsToUpdateException,
  NotFoundMyBookReviewException,
} from './exceptions';
import { MY_BOOK_REVIEW_SELECT_WITH_COUNTS } from './constants';

@Injectable()
export class MyBookReviewService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly myBookService: MyBookService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(MyBookReviewService.name);
  }

  private readonly MY_BOOK_REVIEW_COUNT = {
    id: true,
    myBookId: true,
    review: true,
    isPublic: true,
    createdAt: true,
    updatedAt: true,
    _count: {
      select: {
        reviewComment: true,
        reviewLike: true,
      },
    },
  } as const;

  /**
   * * 사용자의 특정 도서 (MyBook)에 대한 리뷰를 생성합니다.
   * * 하나의 MyBook당 하나의 리뷰만 존재할 수 있습니다. (1:1 관계)
   *
   * @param {CreateMyBookReviewPayload} payload - 생성할 리뷰 정보
   * @param {number} payload.id - 리뷰를 작성할 MyBook의 ID
   * @param {number} payload.userId - 리뷰 작성자(사용자) ID
   * @param {string} payload.review - 리뷰 내용
   * @param {boolean} payload.isPublic - 리뷰 공개 여부
   * @returns {Promise<ResponseMyBookReview>} 생성된 리뷰 정보 (댓글/좋아요 수 포함)
   * @throws {AlreadyExistMyBookReviewException} 이미 해당 책에 리뷰가 존재할 경우
   */
  public async createMyBookReview(
    payload: CreateMyBookReviewPayload,
  ): Promise<FormattedMyBookReview> {
    const { isPublic, id, review, userId } = payload;
    this.logger.log(`리뷰 생성 시작: MyBook ID ${id}, 사용자 ID ${userId}`);

    // MyBook 존재 및 사용자 권한 확인
    await this.myBookService.validateMyBook({
      id,
      userId,
    });
    this.logger.debug(`MyBook 유효성 검증 완료 : MyBook ID (${id}), User ID (${userId})`);

    // 가독성을 위해 변수 할당
    const myBookId = id;

    // 기존 리뷰가 있는지 확인
    const existMyBookReview: FormattedMyBookReview | null =
      await this.findMyBookReviewByMyBookId(myBookId);

    if (existMyBookReview) {
      this.logger.warn(
        `리뷰 생성 실패: MyBook ID ${myBookId}에 이미 리뷰가 존재합니다. (기존 리뷰 ID: ${existMyBookReview.id})`,
      );
      throw new AlreadyExistMyBookReviewException(myBookId);
    } else {
      const select = MY_BOOK_REVIEW_SELECT_WITH_COUNTS;

      // 리뷰 생성
      const myBookReview: FormattedMyBookReview = await this.prismaService.myBookReview.create({
        data: {
          myBookId,
          review,
          isPublic,
        },
        select,
      });
      this.logger.log(`리뷰 생성 완료: ID ${myBookReview.id}`);

      return myBookReview;
    }
  }

  /**
   * * 사용자의 특정 도서 (MyBook)에 대한 리뷰를 조회합니다.
   * * 리뷰가 존재하지 않으면 예외를 발생시킵니다.
   *
   * @param {GetMyBookReviewPayload} payload - 조회할 리뷰에 대한 정보
   * @param {number} payload.id - 조회할 MyBook ID
   * @param {number} payload.userId - 리뷰 작성자 사용자 ID
   * @returns {Promise<ResponseMyBookReview>} 조회된 리뷰 객체
   */
  public async getMyBookReview(payload: GetMyBookReviewPayload): Promise<FormattedMyBookReview> {
    const { id, userId } = payload;
    this.logger.log(`리뷰 조회 시작 : MyBook ID ${id}, User ID ${userId}`);

    // MyBook 존재 및 사용자 권한 확인
    await this.myBookService.validateMyBook({ id, userId });
    this.logger.debug(`MyBook 유효성 검증 완료 : MyBook ID (${id}), User ID (${userId})`);

    // MyBook ID로 리뷰 조회 (없으면 NotFoundMyBookReviewException 발생)
    const myBookReview: FormattedMyBookReview = await this.getMyBookReviewByMyBookId(id);

    this.logger.log(`리뷰 조회 완료 : MyBookReview ID (${myBookReview.id}), MyBook ID (${id})`);
    return myBookReview;
  }

  /**
   * * MyBookReview의 ID를 사용하여 특정 리뷰를 조회합니다.
   * * 주로 다른 서비스에서 리뷰 객체가 필요할 때 사용됩니다.
   *
   * @param {number} myBookReviewId 조회할 리뷰의 ID
   * @returns {Promise<FormattedMyBookReview>} 조회된 리뷰 정보 (댓글/좋아요 수 포함)
   * @throws {NotFoundMyBookReviewException} 해당 ID의 리뷰를 찾을 수 없는 경우
   */
  public async getMyBookReviewById(myBookReviewId: number): Promise<FormattedMyBookReview> {
    this.logger.log(`리뷰 조회 (By ID) 시작 : MyBookReview ID ${myBookReviewId}`);
    // ID로 리뷰 찾기 (없으면 null 반환)
    const myBookReview: FormattedMyBookReview | null =
      await this.findMyBookReviewById(myBookReviewId);

    if (!myBookReview) {
      this.logger.warn(`리뷰 조회 (By ID) 실패 : MyBookReview ID ${myBookReviewId}`);
      throw new NotFoundMyBookReviewException({ myBookReviewId });
    } else {
      this.logger.log(`리뷰 조회 (By ID) 성공 : MyBookReview ID ${myBookReviewId}`);
      return myBookReview;
    }
  }

  /**
   * * MyBook의 ID를 사용하여 해당 MyBook의 리뷰를 조회합니다.
   * * 리뷰가 존재하지 않으면 예외를 발생시킵니다.
   *
   * @param {number} myBookId 조회할 MyBook의 ID
   * @returns {Promise<FormattedMyBookReview>} 조회할 리뷰 정보 (댓글/좋아요 수 포함)
   * @throws {NotFoundMyBookReviewException} 해당 MyBook ID에 대한 리뷰를 찾을 수 없는 경우
   */
  public async getMyBookReviewByMyBookId(myBookId: number): Promise<FormattedMyBookReview> {
    this.logger.log(`리뷰 조회 시작 MyBook ID : ${myBookId}`);
    const myBookReview: FormattedMyBookReview | null =
      await this.findMyBookReviewByMyBookId(myBookId);

    if (!myBookReview) {
      this.logger.warn(`MyBook ID : ${myBookId}에 대한 리뷰가 존재하지 않습니다.`);
      throw new NotFoundMyBookReviewException({ myBookId });
    } else {
      this.logger.log(`리뷰 조회 완료 : ID ${myBookReview.id}`);
      return myBookReview;
    }
  }

  /**
   * * 특정 리뷰의 내용을 수정합니다. (리뷰 내용 또는 공개 여부)
   *
   * @param {UpdateMyBookReviewPayload} payload - 업데이트할 리뷰 정보
   * @param {number} payload.id - 업데이트할 리뷰 ID
   * @param {number} payload.userId - 리뷰 소유자 ID
   * @param {string} [payload.review] - 변경할 리뷰 내용 (선택적)
   * @param {boolean} [payload.isPublic] - 변경할 공개 여부 (선택적)
   * @returns {Promise<ResponseMyBookReview>} 업데이트된 리뷰 객체
   * @throws {NoFieldsToUpdateException} 업데이트할 필드가 없는 경우
   */
  public async updateMyBookReview(
    payload: UpdateMyBookReviewPayload,
  ): Promise<FormattedMyBookReview> {
    const { id, userId, isPublic, review } = payload;
    this.logger.log(`리뷰 수정 시작 : ID ${id}, User ID ${userId}`);

    // 수정할 리뷰 존재 여부 확인 (없으면 NotFoundMyBookReviewException 발생)
    const myBookReview: FormattedMyBookReview = await this.getMyBookReviewById(id);

    // 사용자가 리뷰를 작성한 MyBook의 ID를 가져옵니다.
    const myBookId = myBookReview.id;

    // 사용자 권한 확인 (리뷰가 속한 MyBook의 소유자인지 확인)
    await this.myBookService.validateMyBook({
      id: myBookId,
      userId,
    });
    this.logger.debug(`리뷰 수정 권한 확인 완료`);

    const where: Prisma.MyBookReviewWhereUniqueInput = { id };
    const select = MY_BOOK_REVIEW_SELECT_WITH_COUNTS;
    const data: Prisma.MyBookReviewUpdateInput = {
      ...(isPublic !== undefined && { isPublic }),
      ...(review !== undefined && { review }),
    };

    // 업데이트할 필드가 있는지 확인
    if (Object.keys(data).length === 0) {
      this.logger.warn(`업데이트할 필드가 없습니다.`);
      throw new NoFieldsToUpdateException();
    }

    // 리뷰 업데이트
    const updatedReview: FormattedMyBookReview = await this.prismaService.myBookReview.update({
      where,
      data,
      select,
    });

    this.logger.log(`리뷰 수정 완료`);
    return updatedReview;
  }

  /**
   * * 특정 리뷰와 관련된 모든 데이터 (좋아요, 댓글 포람)을 삭제합니다.
   *
   * @param {UpdateMyBookReviewPayload} payload - 삭제할 리뷰 정보
   * @param {number} payload.id - 삭제할 리뷰 ID
   * @param {number} payload.userId - 리뷰 소유자 ID
   * @returns {Promise<DeleteMyBooKReviewResponse>} 삭제된 리뷰 ID
   */
  public async deleteMyBookReview(
    payload: DeleteMyBookReviewPayload,
  ): Promise<DeleteMyBooKReviewResponse> {
    const { id, userId } = payload;
    this.logger.log(`리뷰 삭제 시작 : ID ${id}, 사용자 ID ${userId}`);

    // 리뷰가 속한 MyBook을 확인하여 사용자 권한을 검증합니다.
    const myBookReview: FormattedMyBookReview = await this.getMyBookReviewById(id);

    // 사용자가 리뷰를 작성한 MyBook의 ID를 가져옵니다.
    const myBookId: number = myBookReview.myBookId;

    // 사용자 권한 확인
    await this.myBookService.validateMyBook({ id: myBookId, userId });
    this.logger.debug(`리뷰 삭제 권한 확인 완료`);

    //  리뷰 및 관련 데이터 삭제 (트랜잭션)
    await this.deleteReviewWithRelations(id);

    // 삭제된 리뷰 ID를 제출합니다.
    return {
      id,
    };
  }

  /**
   * * 특정 리뷰와 관련된 모든 데이터(좋아요, 댓글 등)를 트랜잭션 내에서 안전하게 삭제합니다.
   * @private
   * @param {number} myBookReviewId 삭제할 리뷰 ID
   * @returns {Promise<void>}
   * @throws {NotFoundMyBookReviewException} 트랜잭션 중 리뷰를 찾지 못한 경우 (P2025 오류)
   * @throws {Error} 그 외 데이터베이스 오류 또는 예기치 않은 오류 발생시
   */
  private async deleteReviewWithRelations(myBookReviewId: number): Promise<void> {
    this.logger.log('리뷰 및 연관 데이터 삭제 트랜잭션 시작');
    await this.prismaService
      .$transaction(async (prisma) => {
        // 리뷰에 대한 좋아요 삭제
        this.logger.debug('리뷰 좋아요 삭제 시작');
        await prisma.reviewLike.deleteMany({
          where: { myBookReviewId },
        });
        this.logger.debug('리뷰 좋아요 삭제 완료');

        // 리뷰에 대한 댓글 삭제
        this.logger.debug('리뷰 댓글 삭제 시작');
        await prisma.reviewComment.deleteMany({
          where: { myBookReviewId },
        });
        this.logger.debug('리뷰 댓글 삭제 완료');

        // 리뷰 삭제
        this.logger.debug('리뷰 삭제 시작');
        await prisma.myBookReview.delete({
          where: { id: myBookReviewId },
        });
        this.logger.debug('리뷰 삭제 완료');
      })
      .catch((error) => {
        this.logger.error(`리뷰 삭제 중 오류 발생 : ${error.message}`, error.stack);

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
          this.logger.error(`리뷰 ID ${myBookReviewId}를 찾을 수 없습니다.`);
          throw new NotFoundMyBookReviewException({ myBookReviewId });
        }
        throw error;
      });
  }

  /**
   * * MyBook ID를 사용하여 리뷰를 찾습니다. (결과가 없을 경우 null 반환)
   * @private
   * @param {number} myBookId - 리뷰를 찾을 MyBook의 ID
   * @returns {Promise<FormattedMyBookReview | null>} 조회된 리뷰 객체 또는 null
   */
  private async findMyBookReviewByMyBookId(
    myBookId: number,
  ): Promise<FormattedMyBookReview | null> {
    if (!myBookId) return null;
    this.logger.debug(`내부 조회(By MyBookID) : ${myBookId} 검색`);
    const where: Prisma.MyBookReviewWhereUniqueInput = { myBookId };
    const select = MY_BOOK_REVIEW_SELECT_WITH_COUNTS;

    const myBookReview: FormattedMyBookReview | null =
      await this.prismaService.myBookReview.findUnique({
        where,
        select,
      });

    this.logger.debug(`내부 조회(By MyBookID) : ${myBookId} ${myBookReview ? '찾음' : '못찾음'}`);
    return myBookReview ? myBookReview : null;
  }

  /**
   * * MyBookReview ID를 사용하여 리뷰를 찾습니다. (결과가 없을 경우 null 반환)
   * @private
   * @param {number} myBookReviewId - 찾을 리뷰의 고유 ID
   * @returns {Promise<FormattedMyBookReview | null>} 조회된 리뷰 객체 또는 null
   */
  private async findMyBookReviewById(
    myBookReviewId: number,
  ): Promise<FormattedMyBookReview | null> {
    if (!myBookReviewId) return null;
    this.logger.debug(`내부 조회(By ID) : ${myBookReviewId} 검색`);
    const where: Prisma.MyBookReviewWhereUniqueInput = {
      id: myBookReviewId,
    };
    const select = MY_BOOK_REVIEW_SELECT_WITH_COUNTS;
    const myBookReview: FormattedMyBookReview | null =
      await this.prismaService.myBookReview.findUnique({
        where,
        select,
      });
    this.logger.debug(`내부 조회(By ID) : ${myBookReviewId} ${myBookReview ? '찾음' : '못찾음'}`);

    return myBookReview ? myBookReview : null;
  }
}
