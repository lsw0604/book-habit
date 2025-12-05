import { Controller, Get, HttpException, HttpStatus, Logger, Param, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AxiosError } from 'axios';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { KakaoBookItemDto, KakaoSearchReqDto } from './dto/kakao';
import { KakaoSearchService } from './kakao-search.service';
import { AladinSearchService } from './aladin-search.service';

@Controller('api/search')
export class SearchController {
  private readonly logger = new Logger(SearchController.name);

  constructor(
    private readonly kakaoBookService: KakaoSearchService,
    private readonly aladinBookService: AladinSearchService,
  ) {}

  @Get()
  @ApiOkResponse({
    type: PaginatedDto(KakaoBookItemDto),
    description: '카카오 도서 검색 결과',
  })
  async searchBooks(@Query() queryParams: KakaoSearchReqDto) {
    try {
      return await this.kakaoBookService.searchKakaoBook(queryParams);
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

  @Get('detail/:isbn')
  async getBookDetail(@Param('isbn') isbn: string) {
    try {
      return await this.aladinBookService.searchAladinBook(isbn);
    } catch (error) {
      this.logger.error(`도서 검색 오류: ${error.message}`);

      if (error instanceof HttpException) {
        throw error;
      }

      if (error instanceof AxiosError) {
        if (error.response) {
          const statusCode = error.response.status || HttpStatus.BAD_GATEWAY;
          const message = error.response.data?.message || '외부 API 오류가 발생했습니다';

          throw new HttpException(message, statusCode);
        }

        throw new HttpException(
          '외부 서비스에 연결할 수 없습니다.',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }

      throw new HttpException('서버 내부 오류가 발생했습니다.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
