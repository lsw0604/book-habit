import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty } from 'class-validator';

export class CreateMyBookHistoryDto {
  @IsInt()
  @IsNotEmpty()
  page: number;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  date: Date;
}
