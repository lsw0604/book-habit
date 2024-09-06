import { Type } from 'class-transformer';
import { IsDate, IsInt } from 'class-validator';

export class CreateMyBookHistoryDto {
  @IsInt()
  myBookId: number;

  @IsInt()
  page: number;

  @IsDate()
  @Type(() => Date)
  date: Date;
}
