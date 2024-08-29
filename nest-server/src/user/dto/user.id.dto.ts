import { IsInt } from 'class-validator';

export class UserIdDto {
  @IsInt()
  id: number;
}
