import { UnauthorizedException } from '@nestjs/common';

/**
 * * 카카오 Access Token을 발급받지 못했을 때 발생하는 예외
 */
export class KakaoAccessTokenNotIssuedException extends UnauthorizedException {
  constructor() {
    super('카카오 Access Token을 발급받는데 실패했습니다.');
  }
}
