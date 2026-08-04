import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationMeta } from '../utils/pagination';

/**
 * 제네릭 페이지네이션 DTO를 생성하는 Mixin 함수입니다.
 * @param classRef - 데이터 배열의 각 항목에 대한 DTO 클래스
 */
export function PaginatedDto<T extends Type<unknown>>(classRef: T) {
  abstract class PaginatedHost {
    @ApiProperty({ type: () => PaginationMeta, description: '페이지네이션 메타 정보' })
    meta: PaginationMeta;

    @ApiProperty({ type: [classRef], description: '데이터 배열' })
    items: T[];
  }
  return PaginatedHost;
}
