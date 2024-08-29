import { IsPositive, IsInt } from 'class-validator';

export class AuthTokenPayloadDto {
  @IsInt()
  @IsPositive()
  id: number;
}
