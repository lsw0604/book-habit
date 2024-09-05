import { IsBoolean, IsInt, IsString } from 'class-validator';

export class CreateMyBookCommentDto {
  @IsInt()
  myBookId: number;

  @IsString()
  comment: string;

  @IsBoolean()
  isPublic: boolean;
}
