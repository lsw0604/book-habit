import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { MyBookStatus } from '@prisma/client';

export class CreateMyBookReqDto {
  @ApiProperty({
    description: '도서 ISBN13 (알라딘 검색 결과의 ISBN)',
    example: '9788996991342',
  })
  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'ISBN은 필수 입력값입니다.' })
  isbn: string;

  @ApiProperty({
    description: '독서 상태 (WANT_TO_READ: 읽고 싶어요, CURRENTLY_READING: 읽는 중, READ: 다 읽음)',
    enum: MyBookStatus,
    example: MyBookStatus.WANT_TO_READ,
  })
  @Expose()
  @IsEnum(MyBookStatus, {
    message: 'status는 WANT_TO_READ, CURRENTLY_READING, READ 중 하나여야 합니다.',
  })
  status: MyBookStatus;
}
