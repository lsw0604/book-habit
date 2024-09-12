import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Gender, Provider } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
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

  @IsNotEmpty()
  @IsEnum(Provider)
  provider: Provider;

  @IsOptional()
  @IsString()
  profile?: string;
}
