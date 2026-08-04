import { IsString, IsNotEmpty, IsInt, Min, Max, IsEnum, IsBoolean } from 'class-validator';
import { MyBookStatus } from '@prisma/client';

export class CreateReviewWithMyBookDto {
  @IsString()
  @IsNotEmpty()
  isbn: string;

  @IsInt()
  @Min(0)
  @Max(5)
  rating: number; // 평점 (0~5)

  @IsEnum(MyBookStatus)
  status: MyBookStatus; // e.g. 'READ', 'CURRENTLY_READING', 'WANT_TO_READ'

  @IsString()
  @IsNotEmpty()
  review: string; // 리뷰 본문

  @IsBoolean()
  isPublic: boolean; // 공개 여부
}
