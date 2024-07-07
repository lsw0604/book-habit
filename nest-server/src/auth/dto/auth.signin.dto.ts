import { IsString } from 'class-validator';

export class AuthSignInDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
