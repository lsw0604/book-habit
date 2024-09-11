import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentReplyDto {
  @IsInt()
  @IsNotEmpty()
  myBookCommentId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  reply: string;
}
