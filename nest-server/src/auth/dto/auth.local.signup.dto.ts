import { Gender } from '@prisma/client';
import { IsDate, IsEmail, IsEnum, IsString } from 'class-validator';

export class AuthLocalSignUp {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsDate()
  birthday: Date;

  @IsString()
  name: string;
}
