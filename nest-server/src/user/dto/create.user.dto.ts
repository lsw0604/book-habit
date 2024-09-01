import { IsDate, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Gender, Provider } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsDate()
  @IsOptional()
  birthday?: Date;

  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @IsEnum(Provider)
  provider: Provider;

  @IsOptional()
  @IsString()
  profile?: string;
}
