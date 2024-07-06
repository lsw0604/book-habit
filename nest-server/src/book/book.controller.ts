import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { BookRegisterDto } from './dto/book.register.dto';

@Controller('/api/book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  registerBook(@Body() dto: BookRegisterDto) {
    return this.bookService.registerBook(dto);
  }

  @Delete('/:id')
  deleteBook(@Param('id') id: string) {
    const bookId = parseInt(id, 10);
    return this.bookService.deleteBook(bookId);
  }
}
