import {
  Body,
  Controller,
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
import { AccessGuard } from 'src/auth/guard/access.guard';
import { CreateMyBookDto } from './dto/create.myBook.dto';
import { UpdateMyBookDto } from './dto/update.myBook.dto';
import { UserDecorator } from 'src/decorator/user.decorator';

@UseGuards(AccessGuard)
@Controller('/api/my-book')
export class MyBookController {
  constructor(private myBookService: MyBookService) {}

  @Post()
  async createMyBook(@UserDecorator('id') userId: number, @Body() dto: CreateMyBookDto) {
    return this.myBookService.createMyBook({
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
    @Query('page') page?: string,
    @Query('status') status?: MyBookStatus | 'ALL',
  ) {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const myBookStatus = status ?? 'ALL';

    return await this.myBookService.getMyBookList({ userId, pageNumber, myBookStatus });
  }

  @Delete('/:myBookId')
  async deleteMyBook(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) id: number,
  ) {
    return await this.myBookService.deleteMyBook({ id, userId });
  }

  @Put('/:myBookId')
  async updateMyBook(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) id: number,
    @Body() dto: UpdateMyBookDto,
  ) {
    return await this.myBookService.updateMyBook({
      id,
      userId,
      ...dto,
    });
  }
}
