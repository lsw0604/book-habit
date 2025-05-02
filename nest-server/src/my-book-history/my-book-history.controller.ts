import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Controller,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { MyBookHistory } from '@prisma/client';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { ResponseMessageDecorator, UserDecorator } from 'src/common/decorator';
import { CreateMyBookHistoryDto } from './dto/create.my.book.history.dto';
import { UpdateMyBookHistoryDto } from './dto/update.my.book.history.dto';
import { MyBookHistoryService } from './my-book-history.service';

@UseGuards(AccessGuard)
@Controller('/api/my-book-history')
export class MyBookHistoryController {
  constructor(private readonly myBookHistoryService: MyBookHistoryService) {}

  @Post('/:myBookId')
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessageDecorator('도서 읽기 기록이 생성되었습니다.')
  async createMyBookHistory(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) myBookId: number,
    @Body() dto: CreateMyBookHistoryDto,
  ): Promise<MyBookHistory> {
    return await this.myBookHistoryService.createMyBookHistory({
      userId,
      myBookId,
      ...dto,
    });
  }

  @Get('/:myBookId')
  @HttpCode(HttpStatus.OK)
  @ResponseMessageDecorator('도서 읽기 기록 목록을 조회했습니다.')
  async getMyBookHistories(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) myBookId: number,
  ): Promise<MyBookHistory[]> {
    return await this.myBookHistoryService.getMyBookHistories({
      myBookId,
      userId,
    });
  }

  @Put('/:myBookHistoryId')
  @HttpCode(HttpStatus.OK)
  @ResponseMessageDecorator('도서 읽기 기록이 수정되었습니다.')
  async updateMyBookHistory(
    @UserDecorator('id') userId: number,
    @Param('myBookHistoryId', ParseIntPipe) id: number,
    @Body() dto: UpdateMyBookHistoryDto,
  ): Promise<MyBookHistory> {
    return await this.myBookHistoryService.updateMyBookHistory({
      id,
      userId,
      ...dto,
    });
  }

  @Delete('/:myBookHistoryId')
  @HttpCode(HttpStatus.OK)
  @ResponseMessageDecorator('도서 읽기 기록이 삭제되었습니다.')
  async deleteMyBookHistory(
    @UserDecorator('id') userId: number,
    @Param('myBookHistoryId', ParseIntPipe) id: number,
  ): Promise<MyBookHistory> {
    return await this.myBookHistoryService.deleteMyBookHistory({
      id,
      userId,
    });
  }
}
