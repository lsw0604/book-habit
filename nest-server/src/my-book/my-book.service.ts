import { Injectable } from '@nestjs/common';
import { MyBookStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MyBookService {
  constructor(private prismaService: PrismaService) {}

  async getMyBookList(userId: number, page: string, status: string) {
    const parsedPage = parseInt(page) || 1;
    const startPage = (parsedPage - 1) * 10;
    const decodedStatus = decodeURI(status) as MyBookStatus;

    /**
     * TODO: decodedStatus 수정하기
     */
    if (!decodedStatus) {
      const totalBookCount = await this.prismaService.myBook.count({
        where: {
          userId,
        },
      });

      const totalPage = Math.ceil(totalBookCount / 10);
      const books = await this.prismaService.myBook.findMany({
        where: {
          userId,
        },
        include: {
          book: true,
        },
        skip: startPage,
        take: 10,
      });

      return {
        nextPage: parsedPage >= totalPage ? undefined : parsedPage + 1,
        books,
      };
    } else {
      const totalBookCount = await this.prismaService.myBook.count({
        where: {
          userId,
          myBookStatus: decodedStatus,
        },
      });

      const totalPage = Math.ceil(totalBookCount / 10);
      const books = await this.prismaService.myBook.findMany({
        where: {
          userId,
          myBookStatus: decodedStatus,
        },
        include: {
          book: true,
        },
        skip: startPage,
        take: 10,
      });

      return {
        nextPage: parsedPage >= totalPage ? undefined : parsedPage + 1,
        books,
      };
    }
  }
}
