import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { MyBookHistoryService } from './my-book-history.service';
import { CreateMyBookHistoryDto } from './dto/create.my.book.history.dto';
import { UpdateMyBookHistoryDto } from './dto/update.my.book.history.dto';

@UseGuards(AccessGuard)
@Controller('/api/my-book-history')
export class MyBookHistoryController {
  constructor(private myBookHistoryService: MyBookHistoryService) {}

  @Post()
  async createMyBookHistory(@Req() req: Request, @Body() dto: CreateMyBookHistoryDto) {
    const userId = req.user.id;

    return await this.myBookHistoryService.createMyBookHistory({ userId, ...dto });
  }

  @Get('/:myBookId')
  async getMyBookHistory(@Param('myBookId') myBookId: string) {
    const id = parseInt(myBookId, 10);
    return await this.myBookHistoryService.getMyBookHistoryList({ myBookId: id });
  }

  @Put('/:myBookHistoryId')
  async updateMyBookHistory(
    @Req() req: Request,
    @Param('myBookHistoryId') myBookHistoryId: string,
    @Body() dto: UpdateMyBookHistoryDto,
  ) {
    const userId = req.user.id;
    const id = parseInt(myBookHistoryId, 10);

    return await this.myBookHistoryService.updateMyBookHistory({ id, userId, ...dto });
  }

  @Delete('/:myBookHistoryId')
  async deleteMyBookHistory(
    @Req() req: Request,
    @Param('myBookHistoryId') myBookHistoryId: string,
  ) {
    const userId = req.user.id;
    const id = parseInt(myBookHistoryId, 10);

    return await this.myBookHistoryService.deleteMyBookHistory({ id, userId });
  }
}
