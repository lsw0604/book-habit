import type {
  UpdateMyBookReviewPayload,
  CreateMyBookReviewPayload,
  DeleteMyBookReviewPayload,
  GetMyBookReviewPayload,
  ResponseMyBookReview,
} from './interface';

import { MyBookReview, Prisma } from '@prisma/client';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from 'src/common/logger/logger.service';
import { MyBookService } from 'src/my-book/my-book.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MyBookReviewService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly myBookService: MyBookService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(MyBookReviewService.name);
  }

  /**
   * 나의 책에 리뷰를 생성합니다.
   * 하나의 책에는 하나의 리뷰만 존재할 수 있습니다. (1:1 관계)
   *
   * @param {CreateMyBookReviewPayload} payload - 생성할 리뷰 정보
   * @param {number} payload.id - 리뷰를 작성할 MyBook의 ID
   * @param {number} payload.userId - 리뷰 작성자(사용자) ID
   * @param {string} payload.review - 리뷰 내용
   * @param {boolean} payload.isPublic - 리뷰 공개 여부
   * @returns {Promise<ResponseMyBookReview>} 생성된 리뷰 객체
   * @throws {ConflictException} 이미 해당 책에 리뷰가 존재할 경우
   */
  public async createMyBookReview(
    payload: CreateMyBookReviewPayload,
  ): Promise<ResponseMyBookReview> {
    const { isPublic, id, review, userId } = payload;
    this.logger.log(`리뷰 생성 시작: MyBook ID ${id}, 사용자 ID ${userId}`);

    const myBook = await this.myBookService.validateMyBook({
      id,
      userId,
    });

    // 기존 리뷰가 있는지 확인
    const existingReview: MyBookReview | null = await this.prismaService.myBookReview.findUnique({
      where: { myBookId: myBook.id },
    });

    if (existingReview) {
      this.logger.warn(`이미 MyBook ID ${myBook.id}에 대한 리뷰가 존재합니다.`);
      throw new ConflictException('이미 이 책에 대한 리뷰가 존재합니다.');
    }

    const myBookReview: ResponseMyBookReview = await this.prismaService.myBookReview.create({
      data: {
        myBookId: myBook.id,
        review,
        isPublic,
      },
      select: {
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
      },
    });
    this.logger.log(`리뷰 생성 완료: ID ${myBookReview.id}`);

    return {
      id: myBookReview.id,
      myBookId: myBookReview.myBookId,
      review: myBookReview.review,
      isPublic: myBookReview.isPublic,
      createdAt: myBookReview.createdAt,
      updatedAt: myBookReview.updatedAt,
      _count: {
        reviewComment: myBookReview._count.reviewComment,
        reviewLike: myBookReview._count.reviewLike,
      },
    };
  }

  /**
   * MyBookID 로 리뷰를 조회합니다.
   *
   * @param {GetMyBookReviewPayload} payload - 조회할 리뷰에 대한 정보보
   * @param {number} payload.id - 조회할 MyBook ID
   * @param {number} payload.userId - 리뷰 작성자 사용자 ID
   * @returns {Promise<ResponseMyBookReview>} 조회된 리뷰 객체
   * @throws {NotFoundException} 리뷰를 찾을 수 없는 경우
   */
  public async getMyBookReview(payload: GetMyBookReviewPayload): Promise<ResponseMyBookReview> {
    const { id, userId } = payload;

    // 사용자 권한 확인
    await this.myBookService.validateMyBook({ id, userId });

    const myBookReview: ResponseMyBookReview | null =
      await this.prismaService.myBookReview.findUnique({
        where: { myBookId: id },
        select: {
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
        },
      });

    if (!myBookReview) {
      this.logger.warn(`MyBook ID : ${id}에 대한 리뷰가 존재하지 않습니다.`);
      throw new NotFoundException('리뷰를 찾을 수 없습니다.');
    }

    this.logger.log(`리뷰 조회 완료 : ID ${myBookReview.id}`);
    return {
      id: myBookReview.id,
      myBookId: myBookReview.myBookId,
      review: myBookReview.review,
      isPublic: myBookReview.isPublic,
      createdAt: myBookReview.createdAt,
      updatedAt: myBookReview.updatedAt,
      _count: {
        reviewComment: myBookReview._count.reviewComment,
        reviewLike: myBookReview._count.reviewLike,
      },
    };
  }

  /**
   * 리뷰를 업데이트합니다.
   *
   * @param {UpdateMyBookReviewPayload} payload - 업데이트할 리뷰 정보
   * @param {number} payload.id - 업데이트할 리뷰 ID
   * @param {number} payload.userId - 리뷰 소유자 ID
   * @param {string} [payload.review] - 변경할 리뷰 내용 (선택적)
   * @param {boolean} [payload.isPublic] - 변경할 공개 여부 (선택적)
   * @returns {Promise<ResponseMyBookReview>} 업데이트된 리뷰 객체
   * @throws {NotFoundException} 리뷰를 찾을 수 없는 경우
   * @throws {ConflictException} 업데이트할 필드가 없는 경우
   * @throws {UnauthorizedException} 사용자가 리뷰 소유자가 아닌 경우
   */
  public async updateMyBookReview(
    payload: UpdateMyBookReviewPayload,
  ): Promise<ResponseMyBookReview> {
    const { id, userId, isPublic, review } = payload;
    this.logger.log(`리뷰 수정 시작 : ID ${id}, 사용자 ID ${userId}`);

    const myBookReview: MyBookReview | null = await this.prismaService.myBookReview.findUnique({
      where: { id },
    });

    if (!myBookReview) {
      this.logger.warn(`해당 리뷰가 존재하지 않습니다.`);
      throw new NotFoundException('해당 리뷰를 찾을 수 없습니다.');
    }

    // 사용자 권한 확인
    await this.myBookService.validateMyBook({
      id: myBookReview.myBookId,
      userId,
    });

    const updateData: Prisma.MyBookReviewUpdateInput = {};

    if (isPublic !== undefined) updateData.isPublic = isPublic;
    if (review !== undefined) updateData.review = review;
    if (Object.keys(updateData).length === 0) {
      this.logger.warn(`업데이트할 필드가 없습니다.`);
      throw new ConflictException('업데이트할 필드가 없습니다.');
    }

    const updatedReview: ResponseMyBookReview = await this.prismaService.myBookReview.update({
      where: { id },
      data: updateData,
      select: {
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
      },
    });

    this.logger.log(`리뷰 수정 완료`);
    return {
      id: updatedReview.id,
      myBookId: updatedReview.myBookId,
      review: updatedReview.review,
      isPublic: updatedReview.isPublic,
      createdAt: updatedReview.createdAt,
      updatedAt: updatedReview.updatedAt,
      _count: {
        reviewComment: updatedReview._count.reviewComment,
        reviewLike: updatedReview._count.reviewLike,
      },
    };
  }

  /**
   * 리뷰를 삭제합니다.
   *
   * @param {UpdateMyBookReviewPayload} payload - 삭제할 리뷰 정보
   * @param {number} payload.id - 삭제할 리뷰 ID
   * @param {number} payload.userId - 리뷰 소유자 ID
   * @returns {Promise<{ id: number }>} 삭제된 리뷰 ID
   * @throws {NotFoundException} 리뷰를 찾을 수 없는 경우
   * @throws {UnauthorizedException} 사용자가 리뷰 소유자가 아닌 경우
   */
  public async deleteMyBookReview(payload: DeleteMyBookReviewPayload): Promise<{ id: number }> {
    const { id, userId } = payload;
    this.logger.log(`리뷰 삭제 시작 : ID ${id}, 사용자 ID ${userId}`);

    const myBookReview: MyBookReview | null = await this.prismaService.myBookReview.findUnique({
      where: { id },
    });

    if (!myBookReview) {
      this.logger.warn(`해당 리뷰가 존재하지 않습니다.`);
      throw new NotFoundException('해당 리뷰를 찾을 수 없습니다.');
    }

    // 리뷰가 속한 MyBook을 확인하여 사용자 권한을 검증합니다.
    // 사용자가 리뷰를 작성한 MyBook의 ID를 가져옵니다.
    const myBookId: number = myBookReview.myBookId;

    // 사용자 권한 확인
    await this.myBookService.validateMyBook({ id: myBookId, userId });

    await this.prismaService.$transaction(async (prisma) => {
      // 리뷰에 대한 좋아요와 댓글을 삭제합니다.
      await prisma.reviewLike.deleteMany({
        where: {
          myBookReviewId: myBookReview.id,
        },
      });

      // 리뷰에 대한 댓글을 삭제합니다.
      await prisma.reviewComment.deleteMany({
        where: {
          myBookReviewId: myBookReview.id,
        },
      });

      // 리뷰를 삭제합니다.
      await prisma.myBookReview.delete({
        where: {
          id,
        },
      });
    });

    this.logger.log('리뷰 삭제 완료');
    return {
      id: myBookReview.id,
    };
  }
}
