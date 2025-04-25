import { Module } from '@nestjs/common';
import { MyBookController } from './my-book.controller';
import { MyBookService } from './my-book.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookModule } from 'src/book/book.module';

@Module({
  imports: [BookModule],
  providers: [MyBookService, PrismaService],
  controllers: [MyBookController],
  exports: [MyBookService],
})
export class MyBookModule {}
