import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { KakaoDocument } from '../../types/kakao-search-res.type';

export class KakaoBookItemDto {
  @ApiProperty({ description: 'ISBN' })
  @Expose()
  isbn: string;

  @ApiProperty({ description: '책 제목', example: '미움받을 용기' })
  @Expose()
  title: string;

  @ApiProperty({ description: '저자 리스트', nullable: true, type: [String] })
  @Expose()
  authors: string[] | null;

  @ApiProperty({ description: '번역자 리스트', nullable: true, type: [String] })
  @Expose()
  translators: string[] | null;

  @ApiProperty({ description: '도서 소개', nullable: true })
  @Expose()
  description: string | null;

  @ApiProperty({ description: '출판일', nullable: true })
  @Expose()
  pubDate: string | null;

  @ApiProperty({ description: '출판사', nullable: true })
  @Expose()
  publisher: string | null;

  @ApiProperty({ description: '썸네일 URL', nullable: true })
  @Expose()
  thumbnail: string | null;

  @ApiProperty({ description: '판매 상태', nullable: true })
  @Expose()
  status: string | null;

  static from(raw: KakaoDocument): KakaoBookItemDto {
    return {
      title: raw.title,
      description: raw.contents || null,
      isbn: raw.isbn,
      pubDate: raw.datetime || null,
      authors: raw.authors,
      publisher: raw.publisher || null,
      translators: raw.translators,
      thumbnail: raw.thumbnail || null,
      status: raw.status,
    };
  }
}
