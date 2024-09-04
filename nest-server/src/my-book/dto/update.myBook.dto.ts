import { MyBookStatus } from '@prisma/client';
import { IsEnum, IsInt, IsOptional } from 'class-validator';

export class UpdateMyBookDto {
  @IsInt()
  @IsOptional()
  rating?: number;

  @IsEnum(MyBookStatus)
  @IsOptional()
  myBookStatus?: MyBookStatus;
}
