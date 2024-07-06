import { Body, Controller, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { BookRegisterDto } from './dto/book.register.dto';

@Controller('/api/book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post('/register')
  registerBook(@Body() dto: BookRegisterDto) {
    return this.bookService.registerBook(dto);
  }
}
