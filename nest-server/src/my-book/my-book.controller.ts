import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { MyBookStatus } from '@prisma/client';
import { MyBookService } from './my-book.service';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { CreateMyBookDto } from './dto/create.myBook.dto';
import { UpdateMyBookDto } from './dto/update.myBook.dto';

@UseGuards(AccessGuard)
@Controller('/api/my-book')
export class MyBookController {
  constructor(private myBookService: MyBookService) {}

  @Post()
  async createMyBook(@Req() req: Request, @Body() dto: CreateMyBookDto) {
    const userId = req.user.id;
    const { bookId } = dto;

    const createdMyBook = await this.myBookService.createMyBook({
      userId,
      bookId,
    });

    return createdMyBook;
  }

  @Get('/:myBookId')
  async getMyBook(@Req() req: Request, @Param('myBookId') myBookId: string) {
    const userId = req.user.id;
    const id = parseInt(myBookId, 10);
    const myBook = await this.myBookService.getMyBookDetail({ id, userId });

    return myBook;
  }

  @Get()
  async getMyBookList(
    @Req() req: Request,
    @Query('page') page?: string,
    @Query('status') status?: MyBookStatus | 'ALL',
  ) {
    const userId = req.user.id;
    const pageNumber = page ? parseInt(page, 10) : 1;
    const myBookStatus = status ?? 'ALL';

    const myBookList = await this.myBookService.getMyBookList({ userId, pageNumber, myBookStatus });

    return myBookList;
  }

  @Delete('/:myBookId')
  async deleteMyBook(@Req() req: Request, @Param('myBookId') myBookId: string) {
    const id = parseInt(myBookId, 10);
    const userId = req.user.id;

    await this.myBookService.deleteMyBook({ id, userId });

    return {
      message: `myBook/:${id}를 삭제하는데 성공했습니다.`,
    };
  }

  @Put('/:myBookId')
  async updateMyBook(
    @Req() req: Request,
    @Body() dto: UpdateMyBookDto,
    @Param('myBookId') myBookId: string,
  ) {
    const id = parseInt(myBookId, 10);
    const userId = req.user.id;

    const updatedMyBook = await this.myBookService.updateMyBook({
      id,
      userId,
      ...dto,
    });

    return updatedMyBook;
  }
}
