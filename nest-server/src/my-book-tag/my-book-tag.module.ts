import { Module } from '@nestjs/common';
import { MyBookTagService } from './my-book-tag.service';
import { MyBookTagController } from './my-book-tag.controller';
import { TagModule } from 'src/tag/tag.module';
import { MyBookModule } from 'src/my-book/my-book.module';

@Module({
  imports: [TagModule, MyBookModule],
  providers: [MyBookTagService],
  controllers: [MyBookTagController],
})
export class MyBookTagModule {}
