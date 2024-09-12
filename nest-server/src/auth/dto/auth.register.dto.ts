import { Gender } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class AuthRegisterDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  birthday: Date;

  @IsString()
  @IsNotEmpty()
  name: string;
}
