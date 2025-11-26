import { ApiProperty } from '@nestjs/swagger';
import { MyBookStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

export class UpdateMyBookReqDto {
  @ApiProperty({
    description: '독서 상태 변경',
    enum: MyBookStatus,
    example: MyBookStatus.CURRENTLY_READING,
    required: false,
  })
  @IsOptional()
  @IsEnum(MyBookStatus)
  status?: MyBookStatus;

  @ApiProperty({
    description: '별점 (0~5점)',
    example: 4,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  rating?: number;

  @ApiProperty({
    description: '현재 읽고 있는 페이지',
    example: 150,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  currentPage?: number;

  @ApiProperty({
    description: '독서 시작일',
    example: '2024-01-01T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date) // 문자열로 들어온 날짜를 Date 객체로 변환
  startDate?: Date;

  @ApiProperty({
    description: '독서 완료일',
    example: '2024-01-05T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;
}
