import { IsEmail, IsString } from 'class-validator';

export class AuthSignInDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
