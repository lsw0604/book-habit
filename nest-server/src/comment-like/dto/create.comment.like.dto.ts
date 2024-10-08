import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateCommentLikeDto {
  @IsInt()
  @IsNotEmpty()
  myBookCommentId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
