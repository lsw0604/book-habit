import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMyBookTagDto {
  @IsString()
  @IsNotEmpty()
  tag: string;
}
