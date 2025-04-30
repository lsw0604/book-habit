import { UnauthorizedException } from '@nestjs/common';

/**
 * * 카카오 사용자 정보를 가져오는데 실패했을 때 발생하는 예외
 */
export class KakaoUserInfoFetchFailedException extends UnauthorizedException {
  constructor(message?: string) {
    super(message || '카카오 사용자 정보를 가져오는데 실패했습니다.');
  }
}
