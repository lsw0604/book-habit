import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateMyBookTagDto {
  @IsInt()
  @IsNotEmpty()
  myBookId: number;

  @IsString()
  @IsNotEmpty()
  tag: string;
}
