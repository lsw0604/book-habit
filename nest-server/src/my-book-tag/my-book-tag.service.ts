import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { MyBook, MyBookTag, Tag } from '@prisma/client';
import { MyBookService } from 'src/my-book/my-book.service';
import { PrismaService } from 'src/prisma/prisma.service';

type CreateTagDTO = Pick<Tag, 'tag'>;
type CreateMyBookTagDTO = Pick<MyBookTag, 'myBookId'> & Pick<Tag, 'tag'> & Pick<MyBook, 'userId'>;
type UpdateMyBooKTagDTO = Pick<MyBookTag, 'myBookId'> &
  Pick<Tag, 'tag' | 'id'> &
  Pick<MyBook, 'userId'>;

/**
 * TODO 코드 명명규칙에 대해 다시 한번 생각해보기
 */
@Injectable()
export class MyBookTagService {
  constructor(
    private readonly prismaService: PrismaService,
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
    // 해당 userId가 myBookId에 수정권한이 있는지 검사하는 코드
    await this.myBookService.validateMyBook({ id: myBookId, userId });

    // 해당 myBookId가 존재하는지 확인하고
    const myBook = await this.myBookService.findMyBook({ id: myBookId });

    // 존재하는 tag인지 검사한 뒤, 이미 존재한다면 해당 tag의 ID를 반환하고 없다면 새로 tag를 생성한뒤 tagId를 반환
    const newTag = await this.createTag({ tag });

    // myBookTag를 생성함
    const myBookTag = await this.prismaService.myBookTag.create({
      data: {
        tagId: newTag.id,
        myBookId: myBook.id,
      },
    });

    return myBookTag;
  }

  async findTag({ id }: { id: number }) {
    const tag = await this.prismaService.tag.findUnique({ where: { id } });

    if (!tag) throw new NotFoundException('해당 tag를 찾을 수 없습니다.');

    return tag;
  }

  async updateMyBookTag({ myBookId, tag, userId, id }: UpdateMyBooKTagDTO) {
    // 해당 userId가 myBookId에 수정권한이 있는지 검사하는 코드
    await this.myBookService.validateMyBook({ id: myBookId, userId });

    // 해당 myBookId가 존재하는지 확인하고
    await this.myBookService.findMyBook({ id: myBookId });

    const isExistTag = await this.findTag({ id });

    const isRelated = await this.prismaService.myBookTag.findFirst({
      where: {
        myBookId,
        tagId: isExistTag.id,
      },
    });

    if (!isRelated) throw new ForbiddenException('myBookId와 tagId는 연관되어있지 않습니다.');

    return await this.prismaService.tag.update({
      where: { id },
      data: { tag },
    });
  }
}
