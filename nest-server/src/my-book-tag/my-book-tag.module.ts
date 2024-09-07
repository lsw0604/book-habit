import { Module } from '@nestjs/common';
import { MyBookTagService } from './my-book-tag.service';
import { MyBookTagController } from './my-book-tag.controller';
import { MyBookModule } from 'src/my-book/my-book.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [MyBookModule],
  providers: [MyBookTagService, PrismaService],
  controllers: [MyBookTagController],
})
export class MyBookTagModule {}
