import type { AladinDocumentRaw } from '../../types/aladin-search-res.type'; // 경로에 맞게 수정해주세요
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import * as dayjs from 'dayjs';

export class AladinLookupResDto {
  @ApiProperty({ description: 'ISBN13', example: '9788996991342' })
  @Expose()
  isbn: string;

  @ApiProperty({ description: '책 제목', example: '미움받을 용기' })
  @Expose()
  title: string;

  @ApiProperty({ description: '저자', nullable: true, example: '기시미 이치로' })
  @Expose()
  author: string | null;

  @ApiProperty({ description: '출판사', nullable: true, example: '인플루엔셜' })
  @Expose()
  publisher: string | null;

  @ApiProperty({ description: '출판일', nullable: true, type: Date })
  @Expose()
  pubDate: Date | null;

  @ApiProperty({ description: '책 설명', nullable: true })
  @Expose()
  description: string | null;

  @ApiProperty({ description: '썸네일 이미지 (200px)', nullable: true })
  @Expose()
  thumbnail: string | null;

  @ApiProperty({ description: '커버 이미지 (500px)', nullable: true })
  @Expose()
  coverImage: string | null;

  @ApiProperty({ description: '부제', nullable: true })
  @Expose()
  subTitle: string | null;

  @ApiProperty({ description: '총 페이지 수', nullable: true })
  @Expose()
  totalPage: number | null;

  @ApiProperty({ description: '알라딘 상세 URL', nullable: true })
  @Expose()
  url: string | null;

  @ApiProperty({ description: '재고 상태', nullable: true })
  @Expose()
  stockStatus: string | null;

  // 🏭 Factory Method: Raw Data -> DTO 변환
  static from(doc: AladinDocumentRaw): AladinLookupResDto {
    const {
      title,
      author,
      cover,
      description,
      isbn13,
      link,
      pubDate: rawDate,
      subInfo,
      stockStatus,
      publisher,
    } = doc;

    // 안전장치: subInfo가 없을 경우 대비
    const { itemPage, subTitle } = subInfo || {};

    const pubDate = dayjs(rawDate).isValid() ? dayjs(rawDate).toDate() : null;
    const pattern = /\/(cover|cover200|cover500|sum)\//;

    return {
      isbn: isbn13,
      title,
      author: author || null,
      publisher: publisher || null,
      pubDate,
      description: description || null,
      // URL 치환 로직 (오타 수정됨: /cover/299 -> /cover200/)
      thumbnail: cover ? cover.replace(pattern, '/cover200/') : null,
      coverImage: cover ? cover.replace(pattern, '/cover500/') : null,
      subTitle: subTitle || null,
      totalPage: itemPage || null,
      url: link || null,
      stockStatus: stockStatus || null,
    };
  }
}
