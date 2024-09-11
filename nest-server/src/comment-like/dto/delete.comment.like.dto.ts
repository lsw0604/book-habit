import { IsInt, IsNotEmpty } from 'class-validator';

export class DeleteCommentLikeDto {
  @IsInt()
  @IsNotEmpty()
  commentLikeId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
