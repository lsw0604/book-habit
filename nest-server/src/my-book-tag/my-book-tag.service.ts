import { Injectable, NotFoundException } from '@nestjs/common';
import { TagService } from './tag.service';
import { MyBookService } from 'src/my-book/my-book.service';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateMyBookTagPayload,
  DeleteMyBookTagPayload,
  GetMyBookTagPayload,
  ExistingMyBookTagPayload,
} from './types/my-book-tag';

@Injectable()
export class MyBookTagService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly myBookService: MyBookService,
    private readonly tagService: TagService,
  ) {}

  /**
   * * MyBook과 Tag를 연결해주는 MyBookTag를 생성합니다.
   * @param {CreateMyBookTagPayload} payload - 생성할 MyBookTag 정보
   * @param {number} payload.id - MyBook ID
   * @param {number} payload.userId - 사용자 ID
   * @param {string} payload.tag - 태그 명
   * @returns {Promise<{ myBookId: number; tag: string }>} 생성된 MyBookTag 정보
   * @throws {NotFoundException} MyBook을 찾을 수 없는 경우
   * @throws {NotFoundException} Tag을 찾을 수 없는 경우
   */
  async createMyBookTag(payload: CreateMyBookTagPayload) {
    // myBook 조회
    const myBook = await this.myBookService.validateMyBook({
      id: payload.id,
      userId: payload.userId,
    });
    // Tag 조회하고 생성함
    const existTag = await this.tagService.createTag({ tag: payload.tag });

    const existMyBookTag = await this.existingMyBookTag({
      myBookId: myBook.id,
      tagId: existTag.id,
    });

    if (existMyBookTag) {
      return {
        myBookId: existMyBookTag.myBookId,
        tag: existTag.tag,
      };
    }

    // MyBookTag 생성
    const myBookTag = await this.prismaService.myBookTag.create({
      data: {
        tagId: existTag.id,
        myBookId: myBook.id,
      },
      select: {
        id: true,
        tagId: true,
        myBookId: true,
      },
    });

    return {
      myBookId: myBookTag.myBookId,
      tag: existTag.tag,
    };
  }

  /**
   * * MyBookTag ID로 MyBookTag를 조회합니다.
   * @param {GetMyBookTagPayload} payload - 조회할 MyBookTag 정보
   * @param {number} payload.id - MyBookTag ID
   * @returns {Promise<MyBookTag>} 조회된 MyBookTag
   * @throws {NotFoundException} MyBookTag을 찾을 수 없는 경우
   */
  private async getMyBookTag(payload: GetMyBookTagPayload) {
    const existMyBookTag = await this.prismaService.myBookTag.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!existMyBookTag) throw new NotFoundException('해당 myBookTag를 찾을 수 없습니다.');

    return existMyBookTag;
  }

  /**
   * * MyBook과 Tag를 연결해주는 MyBookTag를 삭제합니다. 더 이상 연결되어있는 Tag와 MyBook이 없다면 Tag를 삭제합니다.
   * @param {DeleteMyBookTagPayload} payload - 삭제할 MyBookTag 정보
   * @param {number} payload.id - MyBookTag ID
   * @param {number} payload.userId - 사용자 ID
   * @returns {Promise<MyBookTag>} 삭제된 MyBookTag
   * @throws {NotFoundException} MyBookTag을 찾을 수 없는 경우
   * @throws {NotFoundException} MyBook을 찾을 수 없는 경우
   */
  async deleteMyBookTag(payload: DeleteMyBookTagPayload) {
    const myBookTag = await this.getMyBookTag({ id: payload.id });
    await this.myBookService.validateMyBook({ id: myBookTag.myBookId, userId: payload.userId });

    const deleteMyBookTag = await this.prismaService.myBookTag.delete({
      where: {
        id: myBookTag.id,
      },
    });

    const tagUsageCount = await this.prismaService.myBookTag.count({
      where: {
        tagId: deleteMyBookTag.tagId,
      },
    });

    if (tagUsageCount === 0) {
      await this.tagService.deleteTag({ id: deleteMyBookTag.tagId });
    }

    return deleteMyBookTag;
  }

  private async existingMyBookTag(payload: ExistingMyBookTagPayload) {
    const existMyBookTag = await this.prismaService.myBookTag.findFirst({
      where: {
        myBookId: payload.myBookId,
        tagId: payload.tagId,
      },
    });

    return existMyBookTag;
  }
}
