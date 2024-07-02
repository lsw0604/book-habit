import { IsString, IsArray, IsDate, IsNumber } from 'class-validator';

export class BookRegisterDto {
  @IsString()
  title: string;

  @IsString()
  contents: string;

  @IsArray()
  authors: string[];

  @IsDate()
  datetime: Date;

  @IsString()
  isbn: string;

  @IsNumber()
  price: number;

  @IsString()
  publisher: string;

  @IsNumber()
  sale_price: number;

  @IsString()
  status: string;

  @IsString()
  thumbnail: string;

  @IsArray()
  translators: string[];

  @IsString()
  url: string;
}
