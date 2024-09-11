import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCommentReplyDto {
  @IsInt()
  @IsNotEmpty()
  commentReplyId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsOptional()
  reply?: string;
}
