import type {
  CreateMyBookTagPayload,
  DeleteMyBookTagPayload,
  GetMyBookTagPayload,
  ResponseCreateMyBookTag,
  ResponseDeleteMyBookTag,
  ResponseGetMyBookTag,
} from './interface';
import { MyBookTag, Prisma, Tag } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { TagService } from 'src/tag/tag.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggerService } from 'src/common/logger/logger.service';
import { MyBookService } from 'src/my-book/my-book.service';
import {
  NotFoundMyBookTagException,
  AlreadyExistMyBookTagException,
  MyBookTagForbiddenAccessException,
} from './exception';

@Injectable()
export class MyBookTagService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly myBookService: MyBookService,
    private readonly tagService: TagService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(MyBookTagService.name);
  }

  /**
   * * MyBook과 Tag를 연결해주는 MyBookTag를 생성합니다.
   * @param {CreateMyBookTagPayload} payload 생성할 MyBookTag 정보
   * @param {number} payload.id MyBook ID
   * @param {number} payload.userId 사용자 ID
   * @param {string} payload.value 태그 값
   * @returns {Promise<ResponseCreateMyBookTag>} 생성된 MyBookTag 정보
   */
  public async createMyBookTag(payload: CreateMyBookTagPayload): Promise<ResponseCreateMyBookTag> {
    const { myBookId, userId, value } = payload;

    // MyBook에 대한 소유권 확인
    await this.myBookService.validateMyBookOwnership(myBookId, userId);
    // 태그가 이미 존재하는지 확인 후 존재하면 기존의 태그값을 반환 아니면 생성함
    const tag: Tag = await this.tagService.findOrCreateTag(value);

    const tagId = tag.id;

    try {
      const createMyBookTag = await this.prismaService.myBookTag.create({
        data: {
          myBookId,
          tagId,
        },
        include: {
          tag: {
            select: {
              value: true,
            },
          },
        },
      });

      const formattedMyBookTag = {
        myBookTagId: createMyBookTag.id,
        value: createMyBookTag.tag.value,
      };

      return formattedMyBookTag;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
        throw new AlreadyExistMyBookTagException(myBookId, value);
      }
      throw err;
    }
  }

  /**
   * * MyBook에 등록된 Tag를 조회합니다.
   * @param {GetMyBookTagPayload} payload Tag를 찾기 위한 정보
   * @param {number} payload.myBookId MyBook ID
   * @param {number} payload.userId User ID
   * @returns {Promise<ResponseGetMyBookTag>} MyBook에 연결된 Tag객체
   */
  public async getMyBookTag(payload: GetMyBookTagPayload): Promise<ResponseGetMyBookTag> {
    const { myBookId, userId } = payload;

    await this.myBookService.validateMyBookOwnership(myBookId, userId);

    const myBookTags = await this.prismaService.myBookTag.findMany({
      where: {
        myBookId,
      },
      select: {
        id: true,
        tag: {
          select: {
            value: true,
          },
        },
      },
    });

    if (!myBookTags) return [];

    const tags: ResponseGetMyBookTag = myBookTags.map(({ id, tag: { value } }) => ({
      myBookTagId: id,
      value,
    }));

    return tags;
  }

  /**
   * * MyBook과 Tag를 연결해주는 MyBookTag를 삭제합니다.
   * * 더 이상 연결되어있는 Tag와 MyBook이 없다면 Tag를 삭제합니다.
   * @param {DeleteMyBookTagPayload} payload 삭제할 MyBookTag 정보
   * @param {number} payload.id MyBookTagID
   * @param {number} payload.userId 사용자ID
   * @returns {Promise<ResponseDeleteMyBookTag>} - 삭제된 MyBookTag의 ID
   */
  public async deleteMyBookTag(payload: DeleteMyBookTagPayload): Promise<ResponseDeleteMyBookTag> {
    const { myBookTagId, userId } = payload;
    await this.validateMyBookTagOwnership(myBookTagId, userId);

    await this.prismaService.$transaction(async (prisma) => {
      const { tagId }: Pick<MyBookTag, 'tagId'> = await prisma.myBookTag.delete({
        where: {
          id: myBookTagId,
        },
        select: {
          tagId: true,
        },
      });

      const tagUsageCount: number = await prisma.myBookTag.count({
        where: {
          tagId,
        },
      });

      if (tagUsageCount === 0) {
        await prisma.tag.delete({
          where: {
            id: tagId,
          },
        });
      }
    });

    return {
      myBookTagId,
    };
  }

  /**
   * * 주어진 MyBookTag ID가 존재하는지, 그리고 연관된 MyBook이 해당 사용자의 소유인지 확인합니다.
   * * 소유권이 없거나 MyBookTag가 존재하지 않으면 예외를 던집니다.
   *
   * @param {number} myBookTagId - 확인할 MyBookTag의 ID
   * @param {number} userId - 작업을 요청한 사용자의 ID
   * @private
   * @throws {NotFoundMyBookTagException} MyBookTag 리소스가 존재하지 않을 때
   * @throws {MyBookTagForbiddenAccessException} MyBookTag는 존재하지만 소유권이 없을 때
   */
  private async validateMyBookTagOwnership(myBookTagId: number, userId: number) {
    const where: Prisma.MyBookTagWhereUniqueInput = { id: myBookTagId };
    const myBookTag = await this.prismaService.myBookTag.findUnique({
      where,
      select: {
        myBook: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!myBookTag) {
      throw new NotFoundMyBookTagException(myBookTagId);
    }
    const ownerId: number = myBookTag.myBook.userId;

    if (ownerId !== userId) {
      throw new MyBookTagForbiddenAccessException({ myBookTagId, ownerId, userId });
    }
  }
}
