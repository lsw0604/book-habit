import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateMyBookReviewDto {
  @IsString()
  @IsNotEmpty()
  review: string;

  @IsBoolean()
  @IsNotEmpty()
  isPublic: boolean;
}
