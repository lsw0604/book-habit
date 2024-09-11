import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateMyBookCommentDto {
  @IsInt()
  @IsNotEmpty()
  myBookId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsBoolean()
  @IsNotEmpty()
  isPublic: boolean;
}
