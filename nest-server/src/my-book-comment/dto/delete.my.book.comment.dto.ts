import { IsInt, IsNotEmpty } from 'class-validator';

export class DeleteMyBookCommentDto {
  @IsInt()
  @IsNotEmpty()
  myBookCommentId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
