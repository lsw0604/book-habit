import { UnauthorizedException } from '@nestjs/common';

/**
 * * 카카오 API 호출 시 응답 데이터에 필요한 정보가 없을 때 발생하는 예외
 */
export class KakaoApiResponseDataInvalidException extends UnauthorizedException {
  constructor(message?: string) {
    super(message || '카카오 API 응답 데이터가 유효하지 않습니다.');
  }
}
