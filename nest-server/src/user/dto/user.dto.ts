import { Gender, Provider } from '@prisma/client';
import { IsDate, IsEnum, IsInt, IsString } from 'class-validator';

export class UserDto {
  @IsInt()
  id: number;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsDate()
  birthday: Date;

  @IsEnum(Gender)
  gender: Gender;

  @IsEnum(Provider)
  provider: Provider;

  @IsString()
  profile: string;
}
