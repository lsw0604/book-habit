import type {
  GetMyBookReviewByIdPayload,
  GetMyBookReviewListPayload,
  UpdateMyBookReviewPayload,
  CreateMyBookReviewPayload,
  DeleteMyBookReviewPayload,
} from './interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { MyBookService } from 'src/my-book/my-book.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MyBookReviewService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly myBookService: MyBookService,
  ) {}

  public async createMyBookReview(dto: CreateMyBookReviewPayload) {
    const myBook = await this.myBookService.validateMyBook({
      id: dto.myBookId,
      userId: dto.userId,
    });

    const myBookReview = await this.prismaService.myBookReview.create({
      data: {
        myBookId: myBook.id,
        review: dto.review,
        isPublic: dto.isPublic,
      },
      select: {
        id: true,
        myBookId: true,
        review: true,
        _count: true,
        isPublic: true,
        createdAt: true,
        updatedAt: true,
        myBook: {
          select: {
            user: {
              select: {
                name: true,
                profile: true,
              },
            },
          },
        },
      },
    });

    return {
      id: myBookReview.id,
      myBookId: myBookReview.myBookId,
      comment: myBookReview.review,
      isPublic: myBookReview.isPublic,
      createdAt: myBookReview.createdAt,
      updatedAt: myBookReview.updatedAt,
      _count: {
        reviewComment: myBookReview._count.reviewComment,
        reviewLike: myBookReview._count.reviewLike,
      },
      user: {
        name: myBookReview.myBook.user.name,
        profile: myBookReview.myBook.user.profile,
      },
    };
  }

  public async getMyBookReviewList(payload: GetMyBookReviewListPayload) {
    const myBookReviewList = await this.prismaService.myBookReview.findMany({
      where: {
        myBookId: payload.myBookId,
      },
      select: {
        id: true,
        myBookId: true,
        review: true,
        isPublic: true,
        createdAt: true,
        updatedAt: true,
        _count: true,
        myBook: {
          select: {
            user: {
              select: {
                name: true,
                profile: true,
              },
            },
          },
        },
      },
    });

    const mappedMyBookReviewList = myBookReviewList.map((myBookReview) => {
      return {
        id: myBookReview.id,
        myBookId: myBookReview.myBookId,
        comment: myBookReview.review,
        isPublic: myBookReview.isPublic,
        createdAt: myBookReview.createdAt,
        updatedAt: myBookReview.updatedAt,
        _count: {
          reviewComment: myBookReview._count.reviewComment,
          reviewLike: myBookReview._count.reviewLike,
        },
        user: {
          name: myBookReview.myBook.user.name,
          profile: myBookReview.myBook.user.profile,
        },
      };
    });

    return {
      myBookReviewList: mappedMyBookReviewList,
    };
  }

  public async updateMyBookReview(payload: UpdateMyBookReviewPayload) {
    const myBookReview = await this.getMyBookReviewById({
      id: payload.myBookReviewId,
    });

    await this.myBookService.validateMyBook({
      id: myBookReview.myBookId,
      userId: payload.userId,
    });

    const updatedMyBookReview = await this.prismaService.myBookReview.update({
      where: {
        id: payload.myBookReviewId,
      },
      data: {
        review: payload.review,
        isPublic: payload.isPublic,
      },
    });

    return updatedMyBookReview;
  }

  public async deleteMyBookReview(payload: DeleteMyBookReviewPayload) {
    const myBookReview = await this.getMyBookReviewById({
      id: payload.myBookReviewId,
    });
    await this.myBookService.validateMyBook({
      id: myBookReview.myBookId,
      userId: payload.userId,
    });
    await this.prismaService.$transaction(async (prisma) => {
      await prisma.reviewLike.deleteMany({
        where: {
          myBookReviewId: myBookReview.id,
        },
      });

      await prisma.reviewComment.deleteMany({
        where: {
          myBookReviewId: myBookReview.id,
        },
      });

      await prisma.myBookReview.delete({
        where: {
          id: myBookReview.id,
        },
      });
    });
    return myBookReview;
  }

  public async getMyBookReviewById(payload: GetMyBookReviewByIdPayload) {
    const myBookReview = await this.prismaService.myBookReview.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!myBookReview) {
      throw new NotFoundException(
        `해당 ID : ${payload.id}를 가진 MyBookComment를 찾을 수 없습니다.`,
      );
    }

    return myBookReview;
  }
}
