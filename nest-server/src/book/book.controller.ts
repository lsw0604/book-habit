import { Controller, Get, Post } from '@nestjs/common';

@Controller('/api/book')
export class BookController {
  @Post()
  registerBook() {}

  @Get()
  isExistBook() {}
}
