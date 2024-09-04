import { IsInt } from 'class-validator';

export class CreateMyBookDto {
  @IsInt()
  bookId: number;
}
