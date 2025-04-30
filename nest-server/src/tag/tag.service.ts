import type { FormattedTag, PublicTagWithCount, SearchTagPayload, TagWithCount } from './interface';
import { Injectable } from '@nestjs/common';
import { Prisma, Tag } from '@prisma/client';
import * as Hangul from 'hangul-js';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggerService } from 'src/common/logger/logger.service';
import { NotFoundTagException } from './exceptions';
import {
  TAG_SELECT_OPTION,
  POPULAR_TAG_ORDERBY_OPTION,
  SEARCH_TAG_ORDERBY_OPTION,
  PUBLIC_POPULAR_TAG_WHERE_OPTION,
  PUBLIC_POPULAR_TAG_SELECT_OPTION,
} from './constant';

@Injectable()
export class TagService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(TagService.name);
  }

  /**
   * * 해당 값을 가진 태그를 조회합니다.
   * * 해당 값이 존재하지 않으면 해당값을 가진 태그를 생성합니다.
   * @param {string} value 등록하려는 태그 값
   * @returns {Promise<Tag>} 생성된 태그
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

  /**
   * * 태그를 인기순으로 보여줍니다.
   * @description (MY BOOK REVIEW)의 공개/비공개 여부와 상관없이
   * @param {number} limit 조회할 태그의 최대 개수
   * @returns {Promise<FormattedTag[]>} 조회된 TAG 정보 베열
   */
  public async getPopularTag(limit: number): Promise<FormattedTag[]> {
    const take: number = limit;
    const tags: TagWithCount[] = await this.prismaService.tag.findMany({
      select: TAG_SELECT_OPTION,
      orderBy: POPULAR_TAG_ORDERBY_OPTION,
      take,
    });

    return tags.map(this.formatTag);
  }

  /**
   * * 태그를 인기순으로 보여줍니다.
   * @description (MY BOOK REVIEW)가 공개된 MY BOOK과 연결된 TAG만을 조회합니다.
   * @param {number} limit 조회할 태그의 최대 개수
   * @returns {Promise<FormattedTag[]>} 조회된 TAG 정보 배열
   */
  public async getPublicPopularTag(limit: number): Promise<FormattedTag[]> {
    const take: number = limit;
    const tags: PublicTagWithCount[] = await this.prismaService.tag.findMany({
      select: PUBLIC_POPULAR_TAG_SELECT_OPTION,
      where: PUBLIC_POPULAR_TAG_WHERE_OPTION,
      orderBy: POPULAR_TAG_ORDERBY_OPTION,
      take,
    });

    return tags.map(this.formatTag);
  }

  /**
   * * 태그를 검색합니다.
   * @param {SearchTagPayload} payload 검색 쿼리와 결과 개수 제한을 담은 페이로드
   * @returns {Promise<FormattedTag[]>} 검색 결과 태그 정보 배열
   */
  public async searchTag(payload: SearchTagPayload): Promise<FormattedTag[]> {
    const { query, limit } = payload;
    const take: number = limit;

    if (!query || query.trim() === '') {
      return [];
    }

    // 초성 검색 여부 확인
    const isInitialSearch: boolean = /^[ㄱ-ㅎ]+$/.test(query);

    let filteredTags: TagWithCount[]; // 타입 명시

    // 초성 검색 처리
    if (isInitialSearch) {
      // DB에서 초성 검색은 직접 지원이 어려움 (데이터 구조 변경 또는 외부 검색 엔진 필요)
      // 모든 태그 가져와서 메모리에서 필터링
      // 초성 검색은 DB 정렬이 어려우므로 여기서 정렬하지 않음
      // TODO: 태그 수가 많아지면 성능 개선 필요 (예: 초성 컬럼 추가, 검색 엔진 도입)
      const allTags: TagWithCount[] = await this.prismaService.tag.findMany({
        select: TAG_SELECT_OPTION,
      });

      const initialFiltered: TagWithCount[] = allTags.filter((tag: TagWithCount): number =>
        Hangul.search(tag.value, query),
      );

      // 메모리에서 정렬 및 제한
      filteredTags = initialFiltered
        .sort(
          (a: TagWithCount, b: TagWithCount): number =>
            b._count.myBookTag - a._count.myBookTag || a.value.localeCompare(b.value),
        )
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
        orderBy: SEARCH_TAG_ORDERBY_OPTION,
        take,
        select: TAG_SELECT_OPTION,
      });
    }

    return filteredTags.map(this.formatTag);
  }

  /**
   * * 특정 ID의 태그를 삭제합니다.
   * @param {number} tagId 삭제할 태그의 ID
   * @returns {Promise<Tag>} 삭제된 태그 정보
   * @throws {NotFoundTagException} 삭제할 태그가 존재하지 않을 경우 발생하는 예외
   */
  public async removeTag(tagId: number): Promise<Tag> {
    const where: Prisma.TagWhereUniqueInput = { id: tagId };
    try {
      const deletedTag: Tag = await this.prismaService.tag.delete({
        where,
      });
      return deletedTag;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === '2025') {
        throw new NotFoundTagException(tagId);
      }
    }
  }

  /**
   * * 태그 정보를 FormattedTag 형식으로 변환합니다.
   * @param {TagWithCount | PublicTagWithCount} tag 변환할 태그 정보
   * @returns {FormattedTag} 변환된 태그 정보
   */
  private formatTag(tag: TagWithCount | PublicTagWithCount): FormattedTag {
    return {
      id: tag.id,
      value: tag.value,
      count: tag._count.myBookTag,
    };
  }
}
