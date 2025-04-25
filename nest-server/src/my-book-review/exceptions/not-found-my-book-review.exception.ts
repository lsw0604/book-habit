import { NotFoundException } from '@nestjs/common';

export class NotFoundMyBookReviewException extends NotFoundException {
  constructor(params: { myBookReviewId?: number; myBookId?: number }) {
    let message: string;
    const errorMetadata: Record<string, any> = {};

    if (params.myBookId) {
      message = `MY BOOK ID : ${params.myBookId}에 대한 리뷰를 찾을 수 없습니다.`;
      errorMetadata.myBookId = params.myBookId;
    } else if (params.myBookReviewId) {
      message = `MY BOOK REVIEW ID : ${params.myBookReviewId}에 대한 리뷰를 찾을 수 없습니다.`;
      errorMetadata.myBookReviewId = params.myBookReviewId;
    } else {
      message = '리부를 찾을 수 없습니다.';
    }

    errorMetadata.errorCode = 'MY_BOOK_REVIEW_NOT_FOUND';

    super({
      message,
      error: 'NOT_FOUND',
      statusCode: 404,
      ...errorMetadata,
    });
  }
}
