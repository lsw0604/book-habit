import { Gender } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsEnum, IsString } from 'class-validator';

export class AuthLocalRegisterDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsDate()
  @Type(() => Date)
  birthday?: Date;

  @IsString()
  name: string;
}
