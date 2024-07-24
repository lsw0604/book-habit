import { Controller, Delete, Get, Param, Query, Req } from '@nestjs/common';
import { MyBookService } from './my-book.service';
import { MyBookStatus } from '@prisma/client';

@Controller('/api/my-book')
export class MyBookController {
  constructor(private myBookService: MyBookService) { }

  @Get()
  async getMyBookList(
    @Req() req,
    @Query('page') page: string = '1',
    @Query('status') status?: MyBookStatus | 'ALL',
  ) {
    const userId = req.user.id;
    const pageNumber = parseInt(page, 10);
    return this.myBookService.getMyBookList(
      userId,
      pageNumber,
      status as MyBookStatus | 'ALL',
    );
  }

  @Delete()
  async deleteMyBook(@Req() req, @Param('id') id: string) {
    const userId = req.user.id;
    const myBookId = parseInt(id, 10);
    await this.myBookService.deleteMyBook(userId, myBookId);
    return;
  }
}
