import { Module } from '@nestjs/common';
import { MyBookService } from './my-book.service';
import { MyBookController } from './my-book.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [MyBookService, PrismaService],
  controllers: [MyBookController],
})
export class MyBookModule { }
