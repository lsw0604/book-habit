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
} from '@nestjs/common';
import { UserDecorator } from 'src/common/decorator/user.decorator';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { LoggerService } from 'src/common/logger/logger.service';
import { ResponseMessageDecorator } from 'src/common/decorator';
import { MyBookService } from './my-book.service';
import { GetMyBooksReqDto, UpdateMyBookReqDto, CreateMyBookReqDto } from './dto';

@UseGuards(AccessGuard)
@Controller('/api/my-book')
export class MyBookController {
  constructor(
    private myBookService: MyBookService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(MyBookController.name);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessageDecorator('나의 서재로 책 등록 성공')
  async addToMyLibrary(@UserDecorator('id') userId: number, @Body() dto: CreateMyBookReqDto) {
    return await this.myBookService.upsertMyBook({ userId, ...dto });
  }

  @Get(':myBookId')
  @HttpCode(HttpStatus.OK)
  @ResponseMessageDecorator('나의 서재에 등록된 책 불러오기 성공')
  async getMyBookDetail(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) myBookId: number,
  ) {
    return await this.myBookService.getMyBookDetail(userId, myBookId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ResponseMessageDecorator('나의 책 목록 조회 성공')
  async getMyBooks(@UserDecorator('id') userId: number, @Query() query: GetMyBooksReqDto) {
    return await this.myBookService.getMyBooks({
      userId,
      ...query,
    });
  }

  @Patch(':myBookId')
  @HttpCode(HttpStatus.OK)
  @ResponseMessageDecorator('나의 책 정보 수정 성공')
  async updateMyBook(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) id: number,
    @Body() dto: UpdateMyBookReqDto,
  ) {
    return await this.myBookService.updateMyBook({
      id,
      userId,
      ...dto,
    });
  }

  @Delete(':myBookId')
  @HttpCode(HttpStatus.OK)
  @ResponseMessageDecorator('나의 책 삭제 성공')
  async deleteMyBook(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) id: number,
  ) {
    return await this.myBookService.deleteMyBook(id, userId);
  }
}
