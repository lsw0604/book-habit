import { IsEmail, IsString } from 'class-validator';

export class UserValidateEmailDto {
  @IsString()
  @IsEmail()
  email: string;
}
