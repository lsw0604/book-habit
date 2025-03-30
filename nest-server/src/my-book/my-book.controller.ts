import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
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
import { CreateMyBookDto } from './dto/create.my.book.dto';
import { UpdateMyBookDto } from './dto/update.my.book.dto';

@UseGuards(AccessGuard)
@Controller('/api/my-book')
export class MyBookController {
  constructor(private myBookService: MyBookService) {}

  @Post()
  async createMyBook(@UserDecorator('id') userId: number, @Body() dto: CreateMyBookDto) {
    const {} = dto;
    return await this.myBookService.createMyBook({
      userId,
      ...dto,
    });
  }

  @Get('/:myBookId')
  async getMyBookDetail(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) id: number,
  ) {
    return this.myBookService.getMyBookDetail({ id, userId });
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
