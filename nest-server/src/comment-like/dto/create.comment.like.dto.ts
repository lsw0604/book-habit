import { IsInt } from 'class-validator';

export class CreateCommentLikeDto {
  @IsInt()
  myBookCommentId: number;
}
