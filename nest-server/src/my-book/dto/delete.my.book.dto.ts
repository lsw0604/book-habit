import { IsInt, IsNotEmpty } from 'class-validator';

export class DeleteMyBookDto {
  @IsInt()
  @IsNotEmpty()
  myBookId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
