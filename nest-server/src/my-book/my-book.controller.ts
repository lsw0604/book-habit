import type {
  FormattedMyBook,
  FormattedMyBooks,
  DeleteMyBookResponse,
  FormattedMyBookDetail,
} from './interface';
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
  DefaultValuePipe,
} from '@nestjs/common';
import { MyBookStatus } from '@prisma/client';
import { MyBookService } from './my-book.service';
import { UserDecorator } from 'src/common/decorator/user.decorator';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { ResponseDto } from 'src/common/dto/response.dto';
import { DatetimeValidator } from 'src/common/utils/time/datetime-validator';
import { CreateMyBookDto } from './dto/create.my.book.dto';
import { UpdateMyBookDto } from './dto/update.my.book.dto';

@UseGuards(AccessGuard)
@Controller('/api/my-book')
export class MyBookController {
  constructor(private myBookService: MyBookService) {}

  /**
   * * 새로운 책을 사용자의 컬렉션에 추가합니다.
   *
   * @param {number} userId 현재 로그인한 사용자의 ID
   * @param {CreateMyBookDto} dto 책 생성에 필요한 데이터
   * @returns {Promise<ResponseDto<FormattedMyBook>>} 생성된 MyBook 정보
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createMyBook(
    @UserDecorator('id') userId: number,
    @Body() dto: CreateMyBookDto,
  ): Promise<ResponseDto<FormattedMyBook>> {
    const datetime: Date = DatetimeValidator.parse(dto.datetime);
    const response: FormattedMyBook = await this.myBookService.createMyBook({
      userId,
      ...dto,
      datetime,
    });
    return ResponseDto.created(response, '책 등록 성공');
  }

  /**
   * * 사용자의 특정 MyBook 상세 정보를 조회합니다.
   *
   * @param {number} userId 현재 로그인한 사용자의 ID
   * @param {number} id 조회할 MyBook ID
   * @returns {Promise<ResponseDto<FormattedMyBookDetail>>} MyBook 상세 정보
   */
  @Get('/:myBookId')
  @HttpCode(HttpStatus.OK)
  async getMyBook(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) id: number,
  ): Promise<ResponseDto<FormattedMyBookDetail>> {
    const response: FormattedMyBookDetail = await this.myBookService.getMyBook({ id, userId });

    return ResponseDto.success(response, '나의 책 정보 조회 성공');
  }

  /**
   * * 사용자의 MyBook 목록을 페이지네이션하여 조회합니다.
   *
   * @param {number} userId 현재 로그인한 사용자의 ID
   * @param {number} pageNumber 페이지 번호 (기본값: 1)
   * @param {MyBookStatus} status 필터링할 상태 (기본값: 'ALL')
   * @param {'desc' | 'asc'} orderBy 정렬 방식 (기본값: 'desc')
   * @returns {Promise<ResponseDto<FormattedMyBooks>>} 페이지네이션된 MyBook 목록
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  async getMyBooks(
    @UserDecorator('id') userId: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) pageNumber: number = 1,
    @Query('status') status: MyBookStatus | 'ALL' = 'ALL',
    @Query('order') orderBy: 'desc' | 'asc' = 'desc',
  ): Promise<ResponseDto<FormattedMyBooks>> {
    const response: FormattedMyBooks = await this.myBookService.getMyBooks({
      userId,
      pageNumber,
      status,
      orderBy,
    });

    return ResponseDto.success(response, '나의 책 목록 조회 성공');
  }

  /**
   * * 사용자의 MyBook 정보를 업데이트합니다.
   *
   * @param {number} userId 현재 로그인한 사용자의 ID
   * @param {number} id 업데이트할 MyBook ID
   * @param {UpdateMyBokDto} dto 업데이트할 데이터
   * @returns {Promise<Response<FormattedMyBookDetail>>} 업데이트된 MyBook 정보
   */
  @Patch('/:myBookId')
  @HttpCode(HttpStatus.OK)
  async updateMyBook(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) id: number,
    @Body() dto: UpdateMyBookDto,
  ): Promise<ResponseDto<FormattedMyBookDetail>> {
    const response: FormattedMyBookDetail = await this.myBookService.updateMyBook({
      id,
      userId,
      ...dto,
    });

    return ResponseDto.success(response, '나의 책 정보 수정 성공');
  }

  /**
   * * 사용자의 MyBook을 삭제합니다.
   *
   * @param {number} userId 현재 로그인한 사용자의 ID
   * @param {number} id 삭제할 MyBook ID
   * @returns {Promise<ResponseDto<DeleteMyBookResponse>>} 삭제된 MyBook ID
   */
  @Delete('/:myBookId')
  @HttpCode(HttpStatus.OK)
  async deleteMyBook(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) id: number,
  ): Promise<ResponseDto<DeleteMyBookResponse>> {
    const response: DeleteMyBookResponse = await this.myBookService.deleteMyBook({ id, userId });

    return ResponseDto.success(response, '나의 책 삭제 성공');
  }
}
