import { IsDate, IsEmail, IsEnum, IsString } from 'class-validator';
import { Gender } from '@prisma/client';

export class UserLocalRegisterDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsDate()
  birthday: Date;

  @IsEnum(Gender)
  gender: Gender;
}
