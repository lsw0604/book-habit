import { Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional } from 'class-validator';

export class UpdateMyBookHistoryDto {
  @IsInt()
  @IsOptional()
  page?: number;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  date?: Date;
}
