import { IsString, IsOptional, IsEnum, IsInt, Min, Max, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchBookDto {
  @IsString()
  @IsNotEmpty({ message: '검색어는 필수 입력값입니다.' })
  query: string;

  @IsOptional()
  @IsEnum(['accuracy', 'latest'], {
    message: '정렬 방식은 accuracy 또는 latest 중 하나여야 합니다.',
  })
  sort?: 'accuracy' | 'latest';

  @IsOptional()
  @Type(() => Number) // string을 number로 변환
  @IsInt({ message: '페이지 번호는 정수여야 합니다.' })
  @Min(1, { message: '페이지 번호는 1 이상이어야 합니다.' })
  @Max(50, { message: '페이지 번호는 50 이하여야 합니다.' })
  page?: number;

  @IsOptional()
  @Type(() => Number) // string을 number로 변환
  @IsInt({ message: '페이지당 결과 수는 정수여야 합니다.' })
  @Min(1, { message: '페이지당 결과 수는 1 이상이어야 합니다.' })
  @Max(50, { message: '페이지당 결과 수는 50 이하여야 합니다.' })
  size?: number;

  @IsOptional()
  @IsEnum(['title', 'isbn', 'publisher', 'person'], {
    message: '검색 대상은 title, isbn, publisher, person 중 하나여야 합니다.',
  })
  target?: 'title' | 'isbn' | 'publisher' | 'person';
}
