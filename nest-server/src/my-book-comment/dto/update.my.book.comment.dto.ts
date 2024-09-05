import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateMyBookCommentDto {
  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;

  @IsString()
  @IsOptional()
  comment?: string;
}
