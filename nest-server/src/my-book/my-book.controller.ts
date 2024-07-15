import { Controller, Get, Query, Request } from '@nestjs/common';
import { MyBookService } from './my-book.service';
import { MyBookStatus } from '@prisma/client';

@Controller('/api/my-book')
export class MyBookController {
  constructor(private myBookService: MyBookService) {}

  @Get()
  async getMyBookList(
    @Request() req,
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
}
