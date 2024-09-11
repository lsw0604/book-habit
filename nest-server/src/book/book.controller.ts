import { Body, Controller, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create.book.dto';

@Controller('/api/book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  async registerBook(@Body() dto: CreateBookDto) {
    return await this.bookService.registerBook(dto);
  }
}
