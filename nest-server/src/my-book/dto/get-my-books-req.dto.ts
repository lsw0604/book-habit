import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { MyBookStatus } from '@prisma/client';

export class GetMyBooksReqDto {
  @IsOptional()
  @Type(() => Number) // Query string을 숫자로 변환
  @IsInt()
  @Min(1)
  pageNumber: number = 1; // Default 값 설정

  @IsOptional()
  @IsEnum(['ALL', MyBookStatus.CURRENTLY_READING, MyBookStatus.READ, MyBookStatus.WANT_TO_READ], {
    message: '유효하지 않은 상태입니다.',
  })
  status: MyBookStatus | 'ALL' = 'ALL';

  @IsOptional()
  @IsEnum(['desc', 'asc'])
  orderBy: 'desc' | 'asc' = 'desc';
}
