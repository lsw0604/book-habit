import { IsPositive, IsInt } from 'class-validator';

export class AuthGenerateTokenDto {
  @IsInt()
  @IsPositive()
  id: number;
}
