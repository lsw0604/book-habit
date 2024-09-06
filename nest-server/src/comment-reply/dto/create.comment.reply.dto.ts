import { IsInt, IsString } from 'class-validator';

export class CreateCommentReplyDto {
  @IsInt()
  myBookCommentId: number;

  @IsString()
  reply: string;
}
