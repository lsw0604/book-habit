import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { MyBook, MyBookHistory } from '@prisma/client';
import { MyBookService } from 'src/my-book/my-book.service';
import { PrismaService } from 'src/prisma/prisma.service';

type CreateMyBookHistoryDTO = Pick<MyBookHistory, 'date' | 'page' | 'myBookId'> &
  Pick<MyBook, 'userId'>;
type GetMyBookHistoryDTO = Pick<MyBookHistory, 'myBookId'>;
type UpdateMyBookHistoryDTO = Pick<MyBookHistory, 'id'> &
  Partial<Pick<MyBookHistory, 'page' | 'date'>> &
  Pick<MyBook, 'userId'>;
type deleteMyBookHistoryDTO = Pick<MyBookHistory, 'id'> & Pick<MyBook, 'userId'>;
type FindMyBookHistoryDTO = Pick<MyBookHistory, 'id'>;
type ValidateCreateMyBookHistoryDTO = Pick<MyBook, 'userId' | 'id'>;
type ValidateMyBookHistoryDTO = Pick<MyBookHistory, 'id'> & Pick<MyBook, 'userId'>;

@Injectable()
export class MyBookHistoryService {
  constructor(
    private prismaService: PrismaService,
    private readonly myBookService: MyBookService,
  ) {}

  async createMyBookHistory({ myBookId, userId, date, page }: CreateMyBookHistoryDTO) {
    await this.validateCreateMyBookHistory({ id: myBookId, userId });
    const myBookHistory = await this.prismaService.myBookHistory.create({
      data: {
        date,
        page,
        myBookId,
      },
    });

    return myBookHistory;
  }

  async getMyBookHistoryList({ myBookId }: GetMyBookHistoryDTO) {
    return await this.prismaService.myBookHistory.findMany({
      where: {
        myBookId,
      },
    });
  }

  async updateMyBookHistory({ id, userId, date, page }: UpdateMyBookHistoryDTO) {
    await this.validateMyBookHistory({ id, userId });
    const myBookHistory = await this.prismaService.myBookHistory.update({
      where: {
        id,
      },
      data: {
        page,
        date,
      },
    });

    return myBookHistory;
  }

  async deleteMyBookHistory({ userId, id }: deleteMyBookHistoryDTO) {
    await this.validateMyBookHistory({ id, userId });
    const myBookHistory = await this.prismaService.myBookHistory.delete({
      where: {
        id,
      },
    });
    return myBookHistory;
  }

  async findMyBookHistory({ id }: FindMyBookHistoryDTO) {
    const myBookHistory = await this.prismaService.myBookHistory.findUnique({
      where: {
        id,
      },
    });

    if (!myBookHistory) {
      throw new NotFoundException(`해당 ID : ${id}를 가진 MyBookHistory를 찾을 수 없습니다.`);
    }

    return myBookHistory;
  }

  private async validateMyBookHistory({ id, userId }: ValidateMyBookHistoryDTO) {
    const myBookHistory = await this.findMyBookHistory({ id });

    const myBook = await this.myBookService.findMyBook({ id: myBookHistory.myBookId });

    if (myBook.userId !== userId) {
      throw new UnauthorizedException('해당 myBook에 대한 권한이 없습니다.');
    }
  }

  private async validateCreateMyBookHistory({ id, userId }: ValidateCreateMyBookHistoryDTO) {
    const myBook = await this.myBookService.findMyBook({ id });

    if (myBook.userId !== userId) {
      throw new UnauthorizedException('해당 myBook에 대한 권한이 없습니다.');
    }
  }
}
