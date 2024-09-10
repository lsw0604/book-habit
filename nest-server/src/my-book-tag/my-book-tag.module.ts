import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { MyBookTagService } from './my-book-tag.service';
import { MyBookTagController } from './my-book-tag.controller';
import { MyBookModule } from 'src/my-book/my-book.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [MyBookModule],
  providers: [MyBookTagService, TagService, PrismaService],
  controllers: [MyBookTagController],
})
export class MyBookTagModule {}
