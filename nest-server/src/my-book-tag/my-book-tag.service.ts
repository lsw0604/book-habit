import type {
  CreateMyBookTagPayload,
  FindMyBookTagPayload,
  DeleteMyBookTagPayload,
  GetMyBookTagPayload,
  MyBookTag,
} from './interface/my.book.tag.interface';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { MyBookService } from 'src/my-book/my-book.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

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
   * @param {number} payload.id              - MyBook ID
   * @param {number} payload.userId          - 사용자 ID
   * @param {string} payload.value           - 태그 값
   * @returns {Promise<ResponseMyBookTag>}   - 생성된 MyBookTag 정보
   * @throws {NotFoundException}             - MyBook을을 찾을 수 없는 경우
   * @throws {ConflictException}             - 이미 존재하는 태그인 경우
   */
  public async createMyBookTag(payload: CreateMyBookTagPayload) {
    if (!payload.myBookId || !payload.userId || !payload.value) {
      throw new BadRequestException('MyBook ID, 사용자 ID, 태그 값이 필요합니다.');
    }

    const myBook = await this.myBookService.validateMyBook({
      id: payload.myBookId,
      userId: payload.userId,
    });

    const tag = await this.tagService.createTag({ value: payload.value });

    const existMyBookTag = await this.findMyBookTag({
      myBookId: myBook.id,
      tagId: tag.id,
    });

    if (existMyBookTag) throw new ConflictException('이미 MyBook에 존재하는 태그입니다.');

    try {
      return await this.prismaService.$transaction(async (prisma) => {
        const myBookTag = await prisma.myBookTag.create({
          data: {
            tagId: tag.id,
            myBookId: myBook.id,
          },
          select: {
            id: true,
            tagId: true,
            myBookId: true,
          },
        });

        return {
          myBookId: myBook.id,
          myBookTagId: myBookTag.id,
          value: tag.value,
        };
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('이미 존재하는 MyBookTag입니다.');
        }
      }
      throw error;
    }
  }

  /**
   * * MyBookTag ID로 MyBookTag를 조회합니다.
   * @param {GetMyBookTagPayload} payload - 조회할 MyBookTag 정보
   * @param {number} payload.id           - MyBookTag ID
   * @returns {Promise<MyBookTag>}        - 조회된 MyBookTag
   * @throws {NotFoundException}          - MyBookTag을 찾을 수 없는 경우
   */
  private async getMyBookTagById(payload: GetMyBookTagPayload): Promise<MyBookTag> {
    if (!payload.id) throw new BadRequestException('MyBookTag ID가 필요합니다.');

    const existMyBookTag: MyBookTag = await this.prismaService.myBookTag.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!existMyBookTag) throw new NotFoundException('해당 myBookTag를 찾을 수 없습니다.');

    return existMyBookTag;
  }

  /**
   * * MyBook과 Tag를 연결해주는 MyBookTag를 삭제합니다.
   * * 더 이상 연결되어있는 Tag와 MyBook이 없다면 Tag를 삭제합니다.
   * @param {DeleteMyBookTagPayload} payload      - 삭제할 MyBookTag 정보
   * @param {number} payload.id                   - MyBookTagID
   * @param {number} payload.userId               - 사용자ID
   * @returns {Promise<Omit<MyBookTag, 'tagId'>>} - 삭제된 MyBookTag
   * @throws {BadRequestException}                - MyBookTag ID와 User ID가 없는 경우
   * @throws {NotFoundException}                  - MyBook을 찾을 수 없는 경우
   */
  public async deleteMyBookTag(payload: DeleteMyBookTagPayload): Promise<Omit<MyBookTag, 'tagId'>> {
    if (!payload.id || !payload.userId) {
      throw new BadRequestException('MyBookTag ID와 사용자 ID가 필요합니다.');
    }

    const myBookTag: Omit<MyBookTag, 'tagId'> = await this.getMyBookTagById({ id: payload.id });

    await this.myBookService.validateMyBook({ id: myBookTag.myBookId, userId: payload.userId });

    try {
      return await this.prismaService.$transaction(async (prisma) => {
        const deleteMyBookTag = await prisma.myBookTag.delete({
          where: {
            id: myBookTag.id,
          },
        });

        const tagUsageCount: number = await prisma.myBookTag.count({
          where: {
            tagId: deleteMyBookTag.tagId,
          },
        });

        if (tagUsageCount === 0) await this.tagService.deleteTag({ id: deleteMyBookTag.tagId });

        return {
          myBookId: deleteMyBookTag.myBookId,
          id: deleteMyBookTag.id,
        };
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('해당 MyBookTag를 찾을 수 없습니다.');
        }
      }
      throw error;
    }
  }

  /**
   * * MyBookTag가 이미 존재하는지 확인합니다.
   * @param {ExistMyBookTagPayload} payload - 조회할 MyBookTag 정보
   * @param {number} payload.myBookId       - MyBookID
   * @param {number} payload.tagId          - TagID
   * @returns {Promise<MyBookTag | null>}   - 조회된 MyBookTag
   * @throws {BadRequestException}          - 필요한 정보가 누락된 경우
   */
  private async findMyBookTag(payload: FindMyBookTagPayload): Promise<MyBookTag | null> {
    if (!payload.myBookId || !payload.tagId) {
      throw new BadRequestException('MyBookID와 TagID가 필요합니다.');
    }

    const whereCondition: Prisma.MyBookTagWhereInput = {
      myBookId: payload.myBookId,
      tagId: payload.tagId,
    };

    const existMyBookTag: MyBookTag | null = await this.prismaService.myBookTag.findFirst({
      where: whereCondition,
    });

    return existMyBookTag;
  }
}
