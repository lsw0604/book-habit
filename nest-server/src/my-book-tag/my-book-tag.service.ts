import { Injectable, NotFoundException } from '@nestjs/common';
import { TagService } from './tag.service';
import { MyBookService } from 'src/my-book/my-book.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MyBookTagService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly myBookService: MyBookService,
    private readonly tagService: TagService,
  ) {}

  async createMyBookTag(payload: CreateMyBookTagPayload) {
    const myBook = await this.myBookService.validateMyBook({
      id: payload.id,
      userId: payload.userId,
    });
    const tag = await this.tagService.createTag({ tag: payload.tag });
    const myBookTag = await this.prismaService.myBookTag.create({
      data: {
        tagId: tag.id,
        myBookId: myBook.id,
      },
    });

    return myBookTag;
  }

  private async getMyBookTag(payload: GetMyBookTagPayload) {
    const existMyBookTag = await this.prismaService.myBookTag.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!existMyBookTag) throw new NotFoundException('해당 myBookTag를 찾을 수 없습니다.');

    return existMyBookTag;
  }

  async deleteMyBookTag(payload: DeleteMyBookTagPayload) {
    const myBookTag = await this.getMyBookTag({ id: payload.id });
    await this.myBookService.validateMyBook({ id: myBookTag.myBookId, userId: payload.userId });

    const deleteMyBookTag = await this.prismaService.myBookTag.delete({
      where: {
        id: myBookTag.id,
      },
    });

    return deleteMyBookTag;
  }
}
