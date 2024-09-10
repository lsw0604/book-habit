import { Injectable, NotFoundException } from '@nestjs/common';
import { MyBook, MyBookTag, Tag } from '@prisma/client';
import { TagService } from './tag.service';
import { MyBookService } from 'src/my-book/my-book.service';
import { PrismaService } from 'src/prisma/prisma.service';

type CreateMyBookTagPayload = Pick<Tag, 'tag'> & Pick<MyBook, 'id' | 'userId'>;
type GetMyBookTagPayload = Pick<MyBookTag, 'id'>;
type DeleteMyBookTagPayload = Pick<MyBookTag, 'id'> & Pick<MyBook, 'userId'>;

@Injectable()
export class MyBookTagService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly myBookService: MyBookService,
    private readonly tagService: TagService,
  ) {}

  async createMyBookTag({ tag, id, userId }: CreateMyBookTagPayload) {
    const myBook = await this.myBookService.validateMyBook({ id, userId });
    const newTag = await this.tagService.createTag({ tag });
    const myBookTag = await this.prismaService.myBookTag.create({
      data: {
        tagId: newTag.id,
        myBookId: myBook.id,
      },
    });

    return myBookTag;
  }

  private async getMyBookTag({ id }: GetMyBookTagPayload) {
    const existMyBookTag = await this.prismaService.myBookTag.findUnique({
      where: {
        id,
      },
    });

    if (!existMyBookTag) throw new NotFoundException('해당 myBookTag를 찾을 수 없습니다.');

    return existMyBookTag;
  }

  async deleteMyBookTag({ id, userId }: DeleteMyBookTagPayload) {
    const myBookTag = await this.getMyBookTag({ id });
    await this.myBookService.validateMyBook({ id: myBookTag.myBookId, userId });

    const deleteMyBookTag = await this.prismaService.myBookTag.delete({
      where: {
        id: myBookTag.id,
      },
    });

    return deleteMyBookTag;
  }
}
