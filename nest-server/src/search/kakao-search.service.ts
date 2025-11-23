import type { ResponseKakaoSearchBook } from './types/kakao-search-res.type';
import type { AxiosError } from 'axios';
import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { KakaoSearchResDto, KakaoSearchReqDto } from './dto/kakao';

@Injectable()
export class KakaoSearchService {
  private readonly logger = new Logger(KakaoSearchService.name);
  private readonly BASE_URL = 'https://dapi.kakao.com';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  public async searchKakaoBook(params: KakaoSearchReqDto): Promise<KakaoSearchResDto> {
    const { query, sort = 'accuracy', page = 1, size = 10, target = 'title' } = params;

    const queryParams = new URLSearchParams();
    queryParams.append('query', query);
    queryParams.append('sort', sort);
    queryParams.append('page', page.toString());
    queryParams.append('size', size.toString());
    queryParams.append('target', target);

    const url = `${this.BASE_URL}/v3/search/book?${queryParams.toString()}`;

    this.logger.debug(`도서 검색: 쿼리="${query}", 페이지=${page}, 항목수=${size}`);

    const { data } = await firstValueFrom(
      this.httpService
        .get<ResponseKakaoSearchBook>(url, {
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

    return KakaoSearchResDto.from(data);
  }
}
