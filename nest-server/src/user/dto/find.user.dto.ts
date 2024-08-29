import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

export class FindUserDto {
  @IsEmail()
  @IsString()
  @IsOptional()
  email?: string;

  @IsInt()
  @IsOptional()
  id?: number;
}
