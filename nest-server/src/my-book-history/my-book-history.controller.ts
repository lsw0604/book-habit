import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { MyBookHistoryService } from './my-book-history.service';
import { CreateMyBookHistoryDto } from './dto/create.my.book.history.dto';
import { UpdateMyBookHistoryDto } from './dto/update.my.book.history.dto';
import { UserDecorator } from 'src/decorator/user.decorator';

@UseGuards(AccessGuard)
@Controller('/api/my-book-history')
export class MyBookHistoryController {
  constructor(private myBookHistoryService: MyBookHistoryService) {}

  @Post('/:myBookId')
  async createMyBookHistory(
    @Param('myBookId', ParseIntPipe) myBookId: number,
    @UserDecorator('id') userId: number,
    @Body()
    dto: CreateMyBookHistoryDto,
  ) {
    return this.myBookHistoryService.createMyBookHistory({ userId, myBookId, ...dto });
  }

  @Get('/:myBookId')
  async getMyBookHistoryList(@Param('myBookId', ParseIntPipe) id: number) {
    return this.myBookHistoryService.getMyBookHistoryList({ id });
  }

  @Put('/:myBookHistoryId')
  async updateMyBookHistory(
    @UserDecorator('id') userId: number,
    @Param('myBookHistoryId', ParseIntPipe) id: number,
    @Body() dto: UpdateMyBookHistoryDto,
  ) {
    return this.myBookHistoryService.updateMyBookHistory({ id, userId, ...dto });
  }

  @Delete('/:myBookHistoryId')
  async deleteMyBookHistory(
    @UserDecorator('id') userId: number,
    @Param('myBookHistoryId') id: number,
  ) {
    return this.myBookHistoryService.deleteMyBookHistory({ id, userId });
  }
}
