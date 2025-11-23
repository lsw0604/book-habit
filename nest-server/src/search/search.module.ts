import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SearchController } from './search.controller';
import { KakaoSearchService } from './kakao-search.service';
import { AladinSearchService } from './aladin-search.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [KakaoSearchService, AladinSearchService],
  controllers: [SearchController],
  exports: [KakaoSearchService, AladinSearchService],
})
export class SearchModule {}
