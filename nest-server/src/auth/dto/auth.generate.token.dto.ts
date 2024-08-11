import { Gender } from '@prisma/client';
import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';

export class AuthGenerateTokenDto {
  @IsNumber()
  id: number;

  @IsString()
  email: string;

  @IsOptional()
  name: string;

  @IsOptional()
  birthday: Date;

  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;
}
