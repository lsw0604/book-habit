import type {
  FormattedMyBook,
  FormattedMyBooks,
  DeleteMyBookResponse,
  FormattedMyBookDetail,
} from './interface';
import {
  Get,
  Body,
  Post,
  Patch,
  Query,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { MyBookStatus } from '@prisma/client';
import { MyBookService } from './my-book.service';
import { UserDecorator, ResponseMessageDecorator } from 'src/common/decorator';
import { DatetimeValidator } from 'src/common/utils/time/datetime-validator';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { CreateMyBookDto } from './dto/create.my.book.dto';
import { UpdateMyBookDto } from './dto/update.my.book.dto';

@UseGuards(AccessGuard)
@Controller('/api/my-book')
export class MyBookController {
  constructor(private myBookService: MyBookService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessageDecorator('책 등록 성공')
  async createMyBook(
    @UserDecorator('id') userId: number,
    @Body() dto: CreateMyBookDto,
  ): Promise<FormattedMyBook> {
    const datetime: Date = DatetimeValidator.parse(dto.datetime);
    const response: FormattedMyBook = await this.myBookService.createMyBook({
      userId,
      ...dto,
      datetime,
    });
    return response;
  }

  @Get('/:myBookId')
  @HttpCode(HttpStatus.OK)
  @ResponseMessageDecorator('나의 책 정보 조회 성공')
  async getMyBook(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) id: number,
  ): Promise<FormattedMyBookDetail> {
    const response: FormattedMyBookDetail = await this.myBookService.getMyBook({ id, userId });

    return response;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ResponseMessageDecorator('나의 책 목록 조회 성공')
  async getMyBooks(
    @UserDecorator('id') userId: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) pageNumber: number = 1,
    @Query('status') status: MyBookStatus | 'ALL' = 'ALL',
    @Query('order') orderBy: 'desc' | 'asc' = 'desc',
  ): Promise<FormattedMyBooks> {
    const response: FormattedMyBooks = await this.myBookService.getMyBooks({
      userId,
      pageNumber,
      status,
      orderBy,
    });
    return response;
  }

  @Patch('/:myBookId')
  @HttpCode(HttpStatus.OK)
  @ResponseMessageDecorator('나의 책 정보 수정 성공')
  async updateMyBook(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) id: number,
    @Body() dto: UpdateMyBookDto,
  ): Promise<FormattedMyBookDetail> {
    const response: FormattedMyBookDetail = await this.myBookService.updateMyBook({
      id,
      userId,
      ...dto,
    });
    return response;
  }

  @Delete('/:myBookId')
  @HttpCode(HttpStatus.OK)
  @ResponseMessageDecorator('나의 책 삭제 성공')
  async deleteMyBook(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) id: number,
  ): Promise<DeleteMyBookResponse> {
    const response: DeleteMyBookResponse = await this.myBookService.deleteMyBook({ id, userId });
    return response;
  }
}
