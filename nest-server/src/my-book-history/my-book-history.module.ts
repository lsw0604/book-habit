import { Module } from '@nestjs/common';
import { MyBookHistoryService } from './my-book-history.service';
import { MyBookHistoryController } from './my-book-history.controller';
import { LoggerService } from 'src/common/logger/logger.service';

@Module({
  providers: [MyBookHistoryService, LoggerService],
  controllers: [MyBookHistoryController],
})
export class MyBookHistoryModule {}
