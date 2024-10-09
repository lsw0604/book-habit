import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MyBookTagService } from './my-book-tag.service';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { UserDecorator } from 'src/decorator/user.decorator';
import { CreateMyBookTagDto } from './dto/create.my.book.tag.dto';

@UseGuards(AccessGuard)
@Controller('/api/my-book-tag')
export class MyBookTagController {
  constructor(private myBookTagService: MyBookTagService) {}

  @Post('/:myBookId')
  @HttpCode(201)
  async createMyBookTag(
    @UserDecorator('id') userId: number,
    @Param('myBookId', ParseIntPipe) myBookId: number,
    @Body() dto: CreateMyBookTagDto,
  ) {
    return this.myBookTagService.createMyBookTag({ userId, id: myBookId, ...dto });
  }

  @Delete('/:myBookTagId')
  async deleteMyBookTag(
    @UserDecorator('id') userId: number,
    @Param('myBookTagId', ParseIntPipe) myBookTagId: number,
  ) {
    return this.myBookTagService.deleteMyBookTag({ id: myBookTagId, userId });
  }
}
