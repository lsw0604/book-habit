import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookService } from 'src/book/book.service';
import { CreateReviewWithMyBookDto } from '../dto';
import { AlreadyExistMyBookReviewException } from '../exceptions';
import { MY_BOOK_REVIEW_SELECT_WITH_COUNTS } from '../constants';
import { CreateReviewWithMyBookResponse } from '../interface';

@Injectable()
export class CreateReviewWithMyBookUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bookService: BookService,
  ) {}

  async execute(
    userId: number,
    dto: CreateReviewWithMyBookDto,
  ): Promise<CreateReviewWithMyBookResponse> {
    // 1. Book 정보 획득 (DB에 없으면 카카오 API 등에서 가져와 자동 생성)
    const book = await this.bookService.findOrCreate(dto.isbn);

    // 2. 하나의 트랜잭션으로 MyBook + MyBookReview 동시 처리
    return await this.prisma.$transaction(async (tx) => {
      // 2-1. MyBook Upsert (생성 또는 업데이트)
      const myBook = await tx.myBook.upsert({
        where: {
          userId_bookId: {
            userId,
            bookId: book.id,
          },
        },
        create: {
          userId,
          bookId: book.id,
          rating: dto.rating,
          status: dto.status,
        },
        update: {
          rating: dto.rating,
          status: dto.status,
        },
      });

      // 2-2. 기존 리뷰 중복 체크
      const existingReview = await tx.myBookReview.findUnique({
        where: { myBookId: myBook.id },
      });

      if (existingReview) {
        throw new AlreadyExistMyBookReviewException(myBook.id);
      }

      // 2-3. MyBookReview 생성 (FormattedMyBookReview 반환을 위해 counts 포함)
      const review = await tx.myBookReview.create({
        data: {
          myBookId: myBook.id,
          review: dto.review,
          isPublic: dto.isPublic,
        },
        select: MY_BOOK_REVIEW_SELECT_WITH_COUNTS,
      });

      return {
        myBook,
        review,
      };
    });
  }
}