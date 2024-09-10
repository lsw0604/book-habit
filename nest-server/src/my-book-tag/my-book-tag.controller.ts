import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { MyBookTagService } from './my-book-tag.service';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { UserDecorator } from 'src/decorator/user.decorator';
import { CreateMyBookTagDto } from './dto/create.my.book.tag.dto';
import { PickPropertyInterceptor } from 'src/interceptors/pick-property.interceptor';

@UseGuards(AccessGuard)
@UseInterceptors(new PickPropertyInterceptor<User, 'id'>(['id']))
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
  @HttpCode(204)
  async deleteMyBookTag(
    @UserDecorator('id') userId: number,
    @Param('myBookTagId', ParseIntPipe) myBookTagId: number,
  ) {
    return this.myBookTagService.deleteMyBookTag({ id: myBookTagId, userId });
  }
}
