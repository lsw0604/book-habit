import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateMyBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  publisher?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  sale_price?: number;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsString()
  contents?: string;

  @IsOptional()
  @IsUrl()
  url?: string;

  @IsDateString()
  datetime: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsArray()
  @IsString({ each: true })
  authors: string[];

  @IsArray()
  @IsString({ each: true })
  isbns: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  translators?: string[];
}
