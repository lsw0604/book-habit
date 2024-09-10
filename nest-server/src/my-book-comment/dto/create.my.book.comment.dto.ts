import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateMyBookCommentDto {
  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsBoolean()
  @IsNotEmpty()
  isPublic: boolean;
}
