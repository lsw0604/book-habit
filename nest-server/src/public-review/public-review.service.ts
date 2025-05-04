import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggerService } from 'src/common/logger/logger.service';
import {
  FormattedPublicReview,
  FormattedPublicReviews,
  GetPublicReviewsPayload,
  PublicReviewWithLike,
} from './interface';
import { PUBLIC_REVIEW_PAGE_SIZE, PUBLIC_REVIEWS_INCLUDE_BASIC } from './constant';
import { PaginationOptions, PaginationUtil } from 'src/common/utils/pagination.util';
import { DatetimeValidator } from 'src/common/utils/time/datetime-validator';

@Injectable()
export class PublicReviewService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(PublicReviewService.name);
  }

  public async getPublicReviews(payload: GetPublicReviewsPayload): Promise<FormattedPublicReviews> {
    const { endDate, pageNumber, startDate, tags, currentUserId } = payload;
    const tagArr: string[] = tags?.split(',');
    DatetimeValidator.validateRange(startDate, endDate);

    const where: Prisma.MyBookReviewWhereInput = {
      isPublic: true,
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
      ...(tags !== undefined &&
        tagArr.length > 0 && {
          myBook: {
            tag: {
              some: {
                tag: {
                  value: {
                    in: tagArr,
                  },
                },
              },
            },
          },
        }),
    };

    const paginationOptions: PaginationOptions = {
      pageNumber,
      pageSize: PUBLIC_REVIEW_PAGE_SIZE,
    };

    const { skip, take } = PaginationUtil.getSkipTake(paginationOptions);

    const [totalCount, publicReviews] = await Promise.all([
      this.prismaService.myBookReview.count({ where }),
      this.prismaService.myBookReview.findMany({
        where,
        include: PUBLIC_REVIEWS_INCLUDE_BASIC,
        skip,
        take,
      }),
    ]);

    const paginationMeta = PaginationUtil.getPaginationMeta(totalCount, paginationOptions);

    return {
      meta: paginationMeta,
      reviews: publicReviews.map((review: PublicReviewWithLike) =>
        this.formattedPublicReview(review, currentUserId),
      ),
    };
  }

  private formattedPublicReview(
    reviews: PublicReviewWithLike,
    currentUserId?: number,
  ): FormattedPublicReview {
    const { id, _count, myBook, createdAt, reviewLike, review, updatedAt } = reviews;
    const { tag, book, user, rating } = myBook;

    const tags: string[] = tag.map(
      ({ tag: { value } }: { tag: { value: string } }): string => value,
    );

    const isLike: boolean = reviewLike.some(
      ({ userId }: { userId: number }): boolean => userId === currentUserId,
    );

    return {
      id,
      user,
      book,
      tags,
      isLike,
      rating,
      review,
      _count,
      createdAt,
      updatedAt,
    };
  }
}
