import { Module } from '@nestjs/common';
import { MyBookHistoryService } from './my-book-history.service';
import { MyBookHistoryController } from './my-book-history.controller';

@Module({
  providers: [MyBookHistoryService],
  controllers: [MyBookHistoryController]
})
export class MyBookHistoryModule {}
