import { IsInt, IsString } from 'class-validator';

export class UserDto {
  @IsInt()
  id: number;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;
}
