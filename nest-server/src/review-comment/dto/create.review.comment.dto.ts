import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReviewCommentDto {
  @IsString()
  @IsNotEmpty()
  comment: string;
}
