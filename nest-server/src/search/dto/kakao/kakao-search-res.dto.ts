import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { KakaoDocument, ResponseKakaoSearchBook } from '../../types/kakao-search-res.type';

// 1. 개별 도서 아이템 (CamelCase 적용)
export class KakaoBookItemDto {
  @ApiProperty({ description: '도서 제목' })
  @Expose()
  title: string;

  @ApiProperty({ description: '도서 소개' })
  @Expose()
  contents: string;

  @ApiProperty({ description: '도서 상세 URL' })
  @Expose()
  url: string;

  @ApiProperty({ description: 'ISBN' })
  @Expose()
  isbn: string;

  @ApiProperty({ description: '출판일', type: Date })
  @Expose()
  pubDate: Date; // datetime -> pubDate (알라딘과 통일)

  @ApiProperty({ description: '저자 리스트' })
  @Expose()
  authors: string[];

  @ApiProperty({ description: '출판사' })
  @Expose()
  publisher: string;

  @ApiProperty({ description: '번역자 리스트' })
  @Expose()
  translators: string[];

  @ApiProperty({ description: '정가' })
  @Expose()
  price: number;

  @ApiProperty({ description: '판매가' })
  @Expose()
  salePrice: number; // sale_price -> salePrice

  @ApiProperty({ description: '썸네일 URL' })
  @Expose()
  thumbnail: string;

  @ApiProperty({ description: '판매 상태' })
  @Expose()
  status: string;

  // 🏭 변환 로직: 여기서 이름을 바꿔줍니다!
  static from(raw: KakaoDocument): KakaoBookItemDto {
    return {
      title: raw.title,
      contents: raw.contents,
      url: raw.url,
      isbn: raw.isbn,
      pubDate: new Date(raw.datetime), // 이름 변경
      authors: raw.authors,
      publisher: raw.publisher,
      translators: raw.translators,
      price: raw.price,
      salePrice: raw.sale_price, // 이름 변경
      thumbnail: raw.thumbnail,
      status: raw.status,
    };
  }
}

// 2. 메타 정보 (CamelCase 적용)
export class KakaoPageInfoDto {
  @ApiProperty({ description: '검색된 총 문서 수' })
  @Expose()
  totalCount: number; // total_count -> totalCount

  @ApiProperty({ description: '노출 가능 문서 수' })
  @Expose()
  pageableCount: number; // pageable_count -> pageableCount

  @ApiProperty({ description: '마지막 페이지 여부' })
  @Expose()
  isEnd: boolean; // is_end -> isEnd

  static from(raw: ResponseKakaoSearchBook['meta']): KakaoPageInfoDto {
    return {
      totalCount: raw.total_count,
      pageableCount: raw.pageable_count,
      isEnd: raw.is_end,
    };
  }
}

// 3. 전체 응답
export class KakaoSearchResDto {
  @ApiProperty({ type: KakaoPageInfoDto })
  @Expose()
  @Type(() => KakaoPageInfoDto)
  meta: KakaoPageInfoDto;

  @ApiProperty({ type: [KakaoBookItemDto] })
  @Expose()
  @Type(() => KakaoBookItemDto)
  items: KakaoBookItemDto[]; // documents -> items (더 보편적인 이름)

  static from(raw: ResponseKakaoSearchBook): KakaoSearchResDto {
    return {
      meta: KakaoPageInfoDto.from(raw.meta),
      items: raw.documents.map((doc) => KakaoBookItemDto.from(doc)),
    };
  }
}
