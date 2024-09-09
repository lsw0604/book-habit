import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { MyBookTagService } from './my-book-tag.service';
import { CreateMyBookTagDto } from './dto/create.my.book.tag.dto';
import { Request } from 'express';
import { AccessGuard } from 'src/auth/guard/access.guard';

@Controller('/api/my-book-tag')
export class MyBookTagController {
  constructor(private myBookTagService: MyBookTagService) {}

  @UseGuards(AccessGuard)
  @Post()
  async createMyBookTag(@Req() req: Request, @Body() dto: CreateMyBookTagDto) {
    const userId = req.user.id;

    return await this.myBookTagService.createMyBookTag({ userId, ...dto });
  }
}
