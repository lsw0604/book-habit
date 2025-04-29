import type { SearchTagPayload, TagWithCount } from './interface';
import { Injectable } from '@nestjs/common';
import { Prisma, Tag } from '@prisma/client';
import * as Hangul from 'hangul-js';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * * 해당 값을 가진 태그를 조회합니다.
   * * 해당 값이 존재하지 않으면 해당값을 가진 태그를 생성합니다.
   * @param {string} value - 태그
   * @returns
   */
  public async findOrCreateTag(value: string): Promise<Tag> {
    const where: Prisma.TagWhereUniqueInput = { value };
    const existTag: Tag = await this.prismaService.tag.findUnique({
      where,
    });

    if (existTag) {
      return existTag;
    } else {
      const createTag: Tag = await this.prismaService.tag.create({
        data: {
          value,
        },
      });

      return createTag;
    }
  }

  public async getPopularTag(limit: number): Promise<TagWithCount[]> {
    const tags = await this.prismaService.tag.findMany({
      select: {
        id: true,
        value: true,
        _count: {
          select: {
            myBookTag: true,
          },
        },
      },
      orderBy: {
        myBookTag: {
          _count: 'desc',
        },
      },
      take: limit,
    });

    const popularTags: { id: number; value: string; count: number }[] = tags.map(
      ({ id, value, _count: { myBookTag } }) => ({
        id,
        value,
        count: myBookTag,
      }),
    );

    return popularTags;
  }

  public async searchTag(payload: SearchTagPayload): Promise<TagWithCount[]> {
    const { query, limit } = payload;

    if (!query || query.trim() === '') {
      return [];
    }

    const take = limit;
    const orderBy: Prisma.TagOrderByWithRelationInput[] = [
      { myBookTag: { _count: 'desc' } },
      { value: 'asc' },
    ];
    // 초성 검색 여부 확인
    const isInitialSearch = /^[ㄱ-ㅎ]+$/.test(query);

    let filteredTags: (Tag & { _count: { myBookTag: number } })[]; // 타입 명시

    // 초성 검색 처리
    if (isInitialSearch) {
      // DB에서 초성 검색은 직접 지원이 어려움 (데이터 구조 변경 또는 외부 검색 엔진 필요)
      // 모든 태그 가져와서 메모리에서 필터링
      // 초성 검색은 DB 정렬이 어려우므로 여기서 정렬하지 않음
      // TODO: 태그 수가 많아지면 성능 개선 필요 (예: 초성 컬럼 추가, 검색 엔진 도입)
      const allTags = await this.prismaService.tag.findMany({
        select: {
          id: true,
          value: true,
          _count: { select: { myBookTag: true } },
        },
      });

      const initialFiltered = allTags.filter((tag) => Hangul.search(tag.value, query));

      // 메모리에서 정렬 및 제한
      filteredTags = initialFiltered
        .sort((a, b) => b._count.myBookTag - a._count.myBookTag || a.value.localeCompare(b.value))
        .slice(0, take);
    } else {
      // 일반 검색 처리 (DB에서 필터링, 정렬, 제한)
      const where: Prisma.TagWhereInput = {
        value: {
          contains: query, // 부분 문자열 검색
        },
      };

      filteredTags = await this.prismaService.tag.findMany({
        where,
        orderBy,
        take,
        select: {
          id: true,
          value: true,
          _count: { select: { myBookTag: true } },
        },
      });
    }

    return filteredTags.map((tag) => ({
      id: tag.id,
      value: tag.value,
      count: tag._count.myBookTag,
    }));
  }

  public async removeTag(tagId: number): Promise<Tag> {
    const where: Prisma.TagWhereUniqueInput = { id: tagId };
    try {
      const deletedTag = await this.prismaService.tag.delete({
        where,
      });
      return deletedTag;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === '') {
      }
    }
  }
}
