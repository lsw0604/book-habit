import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { SearchBookDto } from './dto/search.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);
  private readonly baseUrl = 'https://dapi.kakao.com';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  public async searchBook(params: SearchBookDto): Promise<ResponseSearchBook> {
    const { query, sort = 'accuracy', page = 1, size = 10, target = 'title' } = params;

    const queryParams = new URLSearchParams();
    queryParams.append('query', query);
    queryParams.append('sort', sort);
    queryParams.append('page', page.toString());
    queryParams.append('size', size.toString());
    queryParams.append('target', target);

    const url = `${this.baseUrl}/v3/search/book?${queryParams.toString()}`;

    this.logger.debug(`도서 검색: 쿼리="${query}", 페이지=${page}, 항목수=${size}`);

    try {
      const { data } = await firstValueFrom(
        this.httpService
          .get<ResponseSearchBook>(url, {
            headers: {
              Authorization: `KakaoAK ${this.configService.get<string>('KAKAO_REST_API')}`,
            },
          })
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(`카카오 도서 검색 API 호출 오류: ${error.message}`, error.stack);
              throw error;
            }),
          ),
      );

      return data;
    } catch (error) {
      this.logger.error(`도서 검색 실패: ${error.message}`);
      throw error;
    }
  }
}
