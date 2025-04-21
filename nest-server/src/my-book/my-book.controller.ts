import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MyBookStatus } from '@prisma/client';
import { MyBookService } from './my-book.service';
import { UserDecorator } from 'src/common/decorator/user.decorator';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { ResponseDto } from 'src/common/dto/response.dto';
import { InvalidDatetimeException } from 'src/common/exceptions/time';
import { DatetimeValidator } from 'src/common/utils/time/datetime-validator';
import { CreateMyBookDto } from './dto/create.my.book.dto';
import { UpdateMyBookDto } from './dto/update.my.book.dto';

@UseGuards(AccessGuard)
@Controller('/api/my-book')
export class MyBookController {
  constructor(private myBookService: MyBookService) {}

  @Post()
  @HttpCode(201)
  async createMyBook(@UserDecorator('id') userId: number, @Body() dto: CreateMyBookDto) {
    try {
      const datetime = DatetimeValidator.parse(dto.datetime);
      const response = await this.myBookService.createMyBook({
        userId,
        ...dto,
        datetime,
      });
      return ResponseDto.created(response, '책 등록 성공');
    } catch (error) {
      if (error instanceof InvalidDatetimeException) {
        throw error;
      }

      throw new BadRequestException('책 생성중에 오류가 발생했습니다.');
    }
  }

  @Get('/:myBookId')
  async getMyBook(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) id: number,
  ) {
    const response = await this.myBookService.getMyBook({ id, userId });

    return ResponseDto.success(response, '나의 책 정보 조회 성공');
  }

  @Get()
  async getMyBookList(
    @UserDecorator('id') userId: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) pageNumber: number = 1,
    @Query('status') status: MyBookStatus | 'ALL' = 'ALL',
    @Query('order') orderBy: 'desc' | 'asc' = 'desc',
  ) {
    return await this.myBookService.getMyBookList({ orderBy, userId, pageNumber, status });
  }

  @Put('/:myBookId')
  async updateMyBook(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) myBookId: number,
    @Body() dto: UpdateMyBookDto,
  ) {
    return await this.myBookService.updateMyBook({
      myBookId,
      userId,
      ...dto,
    });
  }

  @Delete('/:myBookId')
  async deleteMyBook(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) myBookId: number,
  ) {
    return await this.myBookService.deleteMyBook({ myBookId, userId });
  }
}
