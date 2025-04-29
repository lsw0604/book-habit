import { Module } from '@nestjs/common';
import { MyBookModule } from 'src/my-book/my-book.module';
import { LoggerService } from 'src/common/logger/logger.service';
import { MyBookHistoryService } from './my-book-history.service';
import { MyBookHistoryController } from './my-book-history.controller';

@Module({
  imports: [MyBookModule],
  providers: [MyBookHistoryService, LoggerService],
  controllers: [MyBookHistoryController],
})
export class MyBookHistoryModule {}
