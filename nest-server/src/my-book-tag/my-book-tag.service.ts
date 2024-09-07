import { Injectable } from '@nestjs/common';
import { MyBookTag, Tag } from '@prisma/client';
import { MyBookService } from 'src/my-book/my-book.service';
import { PrismaService } from 'src/prisma/prisma.service';

type CreateTagDTO = Pick<Tag, 'tag'>;
type CreateMyBookTagDTO = Pick<MyBookTag, 'tagId' | 'myBookId'>;
type ValidateCreateTagDTO = Pick<Tag, 'tag'>;

@Injectable()
export class MyBookTagService {
  constructor(
    private prismaService: PrismaService,
    private readonly myBookService: MyBookService,
  ) {}

  async createTag({ tag }: CreateTagDTO) {
    const existTag = this.prismaService.tag.findFirst({
      where: {
        tag,
      },
    });
  }

  private async createMyBookTag({ tagId, myBookId }: CreateMyBookTagDTO) {}
}
