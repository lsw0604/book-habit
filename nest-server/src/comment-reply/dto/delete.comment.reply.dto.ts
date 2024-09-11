import { IsInt, IsNotEmpty } from 'class-validator';

export class DeleteCommentReplyDto {
  @IsInt()
  @IsNotEmpty()
  commentReplyId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
