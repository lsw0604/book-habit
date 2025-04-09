import { Module } from '@nestjs/common';
import { MyBookModule } from 'src/my-book/my-book.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MyBookHistoryService } from './my-book-history.service';
import { MyBookHistoryController } from './my-book-history.controller';

@Module({
  imports: [MyBookModule, PrismaModule],
  providers: [MyBookHistoryService],
  controllers: [MyBookHistoryController],
})
export class MyBookHistoryModule {}
