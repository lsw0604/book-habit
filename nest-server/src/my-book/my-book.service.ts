import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BookService } from './book.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMyBookDto } from './dto/create.my.book.dto';
import { UpdateMyBookDto } from './dto/update.my.book.dto';
import { DeleteMyBookDto } from './dto/delete.my.book.dto';

@Injectable()
export class MyBookService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bookService: BookService,
  ) {}

  async createMyBook(dto: CreateMyBookDto) {
    const book = await this.bookService.registerBook({ ...dto });

    await this.duplicateMyBook({ bookId: book.id, userId: dto.userId });

    return await this.prismaService.myBook.create({
      data: {
        userId: dto.userId,
        bookId: book.id,
        rating: 0,
        myBookStatus: 'TO_READ',
      },
    });
  }

  async getMyBookDetail(payload: GetMyBookDetailPayload) {
    const myBook = await this.validateMyBook({ id: payload.id, userId: payload.userId });

    const myBookDetail = await this.prismaService.myBook.findUnique({
      where: {
        id: myBook.id,
        userId: myBook.userId,
      },
      select: {
        id: true,
        book: {
          select: {
            isbns: {
              select: {
                isbn: true,
              },
            },
            thumbnail: true,
            title: true,
            url: true,
            contents: true,
            authors: {
              select: {
                author: true,
              },
            },
            publisher: true,
            translators: {
              select: {
                translator: true,
              },
            },
            datetime: true,
          },
        },
        rating: true,
        myBookStatus: true,
        tag: {
          select: {
            tagId: true,
            id: true,
            tag: {
              select: {
                tag: true,
              },
            },
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      id: myBookDetail.id,
      book: {
        ...myBookDetail.book,
        translators: myBookDetail.book.translators.map((item) => item.translator.name),
        authors: myBookDetail.book.authors.map((item) => item.author.name),
        isbn: myBookDetail.book.isbns.map((item) => item.isbn),
      },
      rating: myBookDetail.rating,
      status: myBookDetail.myBookStatus,
      tag: myBookDetail.tag.map((item) => {
        return {
          myBookId: myBook.id,
          myBookTagId: item.id,
          tag: item.tag.tag,
        };
      }),
      createdAt: myBookDetail.createdAt,
      updatedAt: myBookDetail.updatedAt,
    };
  }

  async getMyBookList(payload: GetMyBookListPayload) {
    const { myBookStatus, orderBy, pageNumber, userId } = payload;
    const take = 10;
    const skip = (pageNumber - 1) * take;

    const where: Prisma.MyBookWhereInput = {
      userId,
      ...(myBookStatus && myBookStatus !== 'ALL' && { myBookStatus }),
    };

    const totalCount = await this.prismaService.myBook.count({ where });
    const books = await this.prismaService.myBook.findMany({
      where,
      select: {
        id: true,
        myBookStatus: true,
        tag: {
          select: {
            tag: true,
          },
        },
        rating: true,
        book: {
          select: {
            title: true,
            thumbnail: true,
          },
        },
        history: {
          orderBy: {
            createdAt: orderBy,
          },
          take: 1,
          select: {
            date: true,
          },
        },
      },
      skip,
      take,
      orderBy: {
        createdAt: orderBy,
      },
    });

    const totalPages = Math.ceil(totalCount / take);
    const nextPage = pageNumber < totalPages ? pageNumber + 1 : undefined;

    return {
      nextPage,
      books: books.map((book) => ({
        id: book.id,
        title: book.book.title,
        thumbnail: book.book.thumbnail,
        date: book.history[0]?.date,
        status: book.myBookStatus,
        rating: book.rating,
        hashtag: book.tag.map((t) => t.tag),
      })),
    };
  }

  async updateMyBook(dto: UpdateMyBookDto) {
    const myBook = await this.validateMyBook({ id: dto.myBookId, userId: dto.userId });
    const myBookDetail = await this.prismaService.myBook.update({
      where: {
        id: myBook.id,
      },
      data: {
        myBookStatus: dto.myBookStatus,
        rating: dto.rating,
      },
      select: {
        id: true,
        book: {
          select: {
            isbns: {
              select: {
                isbn: true,
              },
            },
            thumbnail: true,
            title: true,
            url: true,
            contents: true,
            authors: {
              select: {
                author: true,
              },
            },
            publisher: true,
            translators: {
              select: {
                translator: true,
              },
            },
            datetime: true,
          },
        },
        rating: true,
        myBookStatus: true,
        tag: {
          select: {
            tagId: true,
            id: true,
            tag: {
              select: {
                tag: true,
              },
            },
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      id: myBookDetail.id,
      book: {
        ...myBookDetail.book,
        translators: myBookDetail.book.translators.map((item) => item.translator.name),
        authors: myBookDetail.book.authors.map((item) => item.author.name),
        isbn: myBookDetail.book.isbns.map((item) => item.isbn),
      },
      rating: myBookDetail.rating,
      status: myBookDetail.myBookStatus,
      tag: myBookDetail.tag.map((item) => {
        return {
          myBookId: myBook.id,
          myBookTagId: item.id,
          tag: item.tag.tag,
        };
      }),
      createdAt: myBookDetail.createdAt,
      updatedAt: myBookDetail.updatedAt,
    };
  }

  async deleteMyBook(dto: DeleteMyBookDto) {
    const myBook = await this.validateMyBook({ id: dto.myBookId, userId: dto.userId });

    await this.prismaService.$transaction(async (prisma) => {
      await prisma.myBookHistory.deleteMany({
        where: {
          myBookId: myBook.id,
        },
      });

      const comments = await prisma.myBookComment.findMany({
        where: { myBookId: myBook.id },
        select: { id: true },
      });

      const commentIds = comments.map((comment) => comment.id);

      await prisma.commentLike.deleteMany({
        where: {
          myBookCommentId: { in: commentIds },
        },
      });

      await prisma.commentReply.deleteMany({
        where: {
          myBookCommentId: { in: commentIds },
        },
      });

      await prisma.myBookComment.deleteMany({
        where: { myBookId: myBook.id },
      });

      await prisma.myBookTag.deleteMany({
        where: { myBookId: myBook.id },
      });

      await prisma.myBook.delete({
        where: { id: myBook.id },
      });
    });

    return {
      message: `해당 MyBook을 삭제하는데 성공했습니다. CODE:${myBook.id}`,
    };
  }

  async getMyBook(payload: GetMyBookPayload) {
    const myBook = await this.prismaService.myBook.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!myBook) {
      throw new NotFoundException(`해당 MyBook을 찾을 수 없습니다. CODE:${payload.id}`);
    }

    return myBook;
  }

  async validateMyBook(payload: ValidateMyBookPayload) {
    const myBook = await this.getMyBook({ id: payload.id });

    if (myBook.userId !== payload.userId) {
      throw new UnauthorizedException('해당 myBook에 대한 권한이 없습니다.');
    }

    return myBook;
  }

  private async duplicateMyBook(payload: DuplicateMyBookPayload) {
    const myBook = await this.prismaService.myBook.findFirst({
      where: {
        bookId: payload.bookId,
        userId: payload.userId,
      },
    });

    if (!!myBook) {
      throw new BadRequestException('해당 책은 이미 myBook에 등록되어있습니다.');
    }
  }
}
