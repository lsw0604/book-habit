import { IsDate, IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ReadingMood } from '@prisma/client';
import { Type } from 'class-transformer';

export class UpdateMyBookHistoryDto {
  @IsInt()
  @IsOptional()
  @Min(0)
  startPage?: number;

  @IsInt()
  @IsOptional()
  @Min(0)
  endPage?: number;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startTime?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endTime?: Date;

  @IsInt()
  @IsOptional()
  @Min(0)
  readingMinutes?: number;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  date?: Date;

  @IsString()
  @IsOptional()
  memo?: string;

  @IsEnum(ReadingMood)
  @IsOptional()
  readingMood?: ReadingMood;
}
