import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateMyBookCommentDto {
  @IsInt()
  @IsNotEmpty()
  myBookCommentId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;

  @IsString()
  @IsOptional()
  comment?: string;
}
