import { Gender } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  birthday: Date;

  @IsString()
  @IsOptional()
  profile?: string;
}
