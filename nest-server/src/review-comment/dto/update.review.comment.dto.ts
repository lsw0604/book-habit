import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateReviewCommentDto {
  @IsString()
  @IsNotEmpty()
  comment: string;
}
