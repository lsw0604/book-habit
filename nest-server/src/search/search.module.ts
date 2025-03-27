import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [SearchService],
  controllers: [SearchController],
  exports: [SearchService],
})
export class SearchModule {}
