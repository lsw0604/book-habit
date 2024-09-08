import { Injectable } from '@nestjs/common';
import { MyBook, MyBookTag, Tag } from '@prisma/client';
import { MyBookService } from 'src/my-book/my-book.service';
import { PrismaService } from 'src/prisma/prisma.service';

type CreateTagDTO = Pick<Tag, 'tag'>;
type CreateMyBookTagDTO = Pick<MyBookTag, 'myBookId'> & Pick<Tag, 'tag'> & Pick<MyBook, 'userId'>;

@Injectable()
export class MyBookTagService {
  constructor(
    private prismaService: PrismaService,
    private readonly myBookService: MyBookService,
  ) {}

  async createTag({ tag }: CreateTagDTO) {
    const existTag = await this.prismaService.tag.findFirst({
      where: {
        tag,
      },
    });

    if (!existTag) {
      const newTag = await this.prismaService.tag.create({
        data: {
          tag,
        },
      });

      return newTag;
    }

    return existTag;
  }

  async createMyBookTag({ tag, myBookId, userId }: CreateMyBookTagDTO) {
    await this.myBookService.validateMyBook({ id: myBookId, userId });
    const myBook = await this.myBookService.findMyBook({ id: myBookId });

    const newTag = await this.createTag({ tag });

    const myBookTag = await this.prismaService.myBookTag.create({
      data: {
        tagId: newTag.id,
        myBookId: myBook.id,
      },
    });

    return myBookTag;
  }
}
