import { Controller, Get, HttpException, HttpStatus, Logger, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchBookDto } from './dto/search.dto';
import { AxiosError } from 'axios';

@Controller('api/search')
export class SearchController {
  private readonly logger = new Logger(SearchController.name);

  constructor(private readonly searchService: SearchService) {}

  @Get()
  async searchBook(@Query() queryParams: SearchBookDto) {
    try {
      return await this.searchService.searchBook(queryParams);
    } catch (error) {
      this.logger.error(`도서 검색 오류: ${error.message}`);

      if (error instanceof HttpException) {
        throw error;
      }

      if (error instanceof AxiosError) {
        if (error.response) {
          // API 서버에서 에러 응답이 온 경우
          const statusCode = error.response.status || HttpStatus.BAD_GATEWAY;
          const message = error.response.data?.message || '외부 API 오류가 발생했습니다';

          throw new HttpException(message, statusCode);
        }

        // 네트워크 오류 등의 경우
        throw new HttpException('외부 서비스에 연결할 수 없습니다', HttpStatus.SERVICE_UNAVAILABLE);
      }

      // 그 외 에러
      throw new HttpException('서버 내부 오류가 발생했습니다', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
