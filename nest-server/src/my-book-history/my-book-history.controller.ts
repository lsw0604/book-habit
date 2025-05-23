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
import { UserDecorator } from 'src/common/decorator/user.decorator';
import { ResponseDto } from 'src/common/dto/response.dto';
import { CreateMyBookHistoryDto } from './dto/create.my.book.history.dto';
import { UpdateMyBookHistoryDto } from './dto/update.my.book.history.dto';
import { MyBookHistoryService } from './my-book-history.service';

@UseGuards(AccessGuard)
@Controller('/api/my-book-history')
export class MyBookHistoryController {
  constructor(private readonly myBookHistoryService: MyBookHistoryService) {}

  /**
   * 새로운 도서 읽기 기록을 생성합니다.
   *
   * @param userId 사용자 ID
   * @param myBookId MyBook ID
   * @param dto 생성할 도서 읽기 기록 데이터
   * @returns {MyBookHistory} 생성된 도서 읽기 기록
   */
  @Post('/:myBookId')
  @HttpCode(HttpStatus.CREATED)
  async createMyBookHistory(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) myBookId: number,
    @Body() dto: CreateMyBookHistoryDto,
  ): Promise<ResponseDto<MyBookHistory>> {
    const myBookHistory: MyBookHistory = await this.myBookHistoryService.createMyBookHistory({
      userId,
      myBookId,
      ...dto,
    });

    return ResponseDto.created(myBookHistory, '도서 읽기 기록이 생성되었습니다.');
  }

  /**
   * 특정 도서의 읽기 기록 목록을 조회합니다.
   *
   * @param userId 사용자 ID
   * @param id MyBook ID
   * @returns {MyBookHistory} 도서 읽기 기록 목록
   */
  @Get('/:myBookId')
  @HttpCode(HttpStatus.OK)
  async getMyBookHistories(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) myBookId: number,
  ): Promise<ResponseDto<MyBookHistory[]>> {
    const myBookHistories: MyBookHistory[] = await this.myBookHistoryService.getMyBookHistories({
      myBookId,
      userId,
    });

    return ResponseDto.success(myBookHistories, '도서 읽기 기록 목록을 조회했습니다.');
  }

  /**
   * 도서 읽기 기록을 수정합니다.
   *
   * @param userId 사용자 ID
   * @param id 수정할 MyBookHistory ID
   * @param dto 수정할 도서 읽기 기록 데이터
   * @returns {MyBookHistory} 수정된 도서 읽기 기록
   */
  @Put('/:myBookHistoryId')
  @HttpCode(HttpStatus.OK)
  async updateMyBookHistory(
    @UserDecorator('id') userId: number,
    @Param('myBookHistoryId', ParseIntPipe) id: number,
    @Body() dto: UpdateMyBookHistoryDto,
  ): Promise<ResponseDto<MyBookHistory>> {
    const updatedHistory: MyBookHistory = await this.myBookHistoryService.updateMyBookHistory({
      id,
      userId,
      ...dto,
    });

    return ResponseDto.success(updatedHistory, '도서 읽기 기록이 수정되었습니다.');
  }

  /**
   * 도서 읽기 기록을 삭제합니다.
   *
   * @param userId 사용자 ID
   * @param id 삭제할 MyBookHistory ID
   * @returns {MyBookHistory} 삭제된 도서 읽기 기록
   */
  @Delete('/:myBookHistoryId')
  @HttpCode(HttpStatus.OK)
  async deleteMyBookHistory(
    @UserDecorator('id') userId: number,
    @Param('myBookHistoryId', ParseIntPipe) id: number,
  ): Promise<ResponseDto<MyBookHistory>> {
    const deletedHistory: MyBookHistory = await this.myBookHistoryService.deleteMyBookHistory({
      id,
      userId,
    });

    return ResponseDto.success(deletedHistory, '도서 읽기 기록이 삭제되었습니다.');
  }
}
