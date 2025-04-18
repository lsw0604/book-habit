import { NotFoundException } from '@nestjs/common';

export class NotFoundBookException extends NotFoundException {
  constructor(params: { bookId?: number; isbnCodes?: string[] } | number | string[]) {
    let message: string;
    const errorMetadata: Record<string, any> = {};

    if (typeof params === 'number') {
      message = `BOOK ID : ${params}을 찾을 수 없습니다.`;
      errorMetadata.bookId = params;
    } else if (Array.isArray(params)) {
      message = `ISBN: ${params.join(', ')}로 책을 찾을 수 없습니다.`;
      errorMetadata.isbnCodes = params;
    } else {
      if (params.bookId) {
        message = `BOOK ID : ${params.bookId}을 찾을 수 없습니다.`;
        errorMetadata.bookId = params.bookId;
      } else if (params.isbnCodes && params.isbnCodes.length > 0) {
        message = `ISBN: ${params.isbnCodes.join(', ')}로 책을 찾을 수 없습니다.`;
        errorMetadata.isbnCodes = params.isbnCodes;
      } else {
        message = '책을 찾을 수 없습니다.';
      }

      errorMetadata.errorCode = 'BOOK_NOT_FOUND';

      super({
        message,
        error: 'Not Found',
        statusCode: 404,
        ...errorMetadata,
      });
    }
  }
}
