import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateMyBookReviewDto {
  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;

  @IsString()
  @IsOptional()
  comment?: string;
}
