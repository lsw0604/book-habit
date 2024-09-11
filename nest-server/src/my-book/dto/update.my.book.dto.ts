import { MyBookStatus } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateMyBookDto {
  @IsInt()
  @IsNotEmpty()
  myBookId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsOptional()
  rating?: number;

  @IsEnum(MyBookStatus)
  @IsOptional()
  myBookStatus?: MyBookStatus;
}
