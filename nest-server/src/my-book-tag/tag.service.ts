import { Tag } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

type CreateTagPayload = Pick<Tag, 'tag'>;
type GetTagPayload = Partial<Tag>;

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTag({ tag }: CreateTagPayload) {
    const existTag = await this.prismaService.tag.findUnique({ where: { tag } });

    if (!existTag) return await this.prismaService.tag.create({ data: { tag } });

    return existTag;
  }

  async getTag({ id, tag }: GetTagPayload) {
    const existTag = await this.prismaService.tag.findFirst({
      where: {
        id,
        tag,
      },
    });

    if (!existTag) throw new NotFoundException('해당 태그를 찾을 수 없습니다.');

    return existTag;
  }
}
