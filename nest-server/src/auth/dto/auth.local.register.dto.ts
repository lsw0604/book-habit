import { Gender } from '@prisma/client';
import { IsDate, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class AuthLocalRegisterDto {
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @IsDate()
  @IsOptional()
  birthday?: Date;

  @IsString()
  @IsOptional()
  name?: string;
}
