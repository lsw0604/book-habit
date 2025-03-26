import { IsInt, IsNotEmpty } from 'class-validator';

export class DeleteMyBookReviewDto {
  @IsInt()
  @IsNotEmpty()
  myBookReviewId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
