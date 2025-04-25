import { Module } from '@nestjs/common';
import { MyBookController } from './my-book.controller';
import { MyBookService } from './my-book.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookModule } from 'src/book/book.module';
import { LoggerService } from 'src/common/logger/logger.service';

@Module({
  imports: [BookModule],
  providers: [MyBookService, PrismaService, LoggerService],
  controllers: [MyBookController],
  exports: [MyBookService],
})
export class MyBookModule {}
