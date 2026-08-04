import { HttpStatus } from '@nestjs/common';
import { BusinessException } from 'src/common/exceptions';

/**
 * 로그인 실패 시 (이메일 미존재 또는 비밀번호 불일치) 발생하는 통합 인증 예외
 * 계정 탐색 공격(Account Enumeration)을 방지하기 위해 에러 메시지를 통일함
 */
export class InvalidCredentialsException extends BusinessException {
  constructor() {
    super(
      '이메일 또는 비밀번호가 올바르지 않습니다.',
      'INVALID_CREDENTIALS',
      HttpStatus.UNAUTHORIZED,
    );
  }
}

/**
 * 카카오 Access Token을 발급받지 못했을 때 발생하는 예외
 */
export class KakaoAccessTokenNotIssuedException extends BusinessException {
  constructor(message?: string) {
    super(
      message || '카카오 Access Token을 발급받는데 실패했습니다.',
      'KAKAO_TOKEN_NOT_ISSUED',
      HttpStatus.UNAUTHORIZED,
    );
  }
}

/**
 * 카카오 API 호출 시 응답 데이터에 필요한 정보가 없을 때 발생하는 예외
 */
export class KakaoApiResponseDataInvalidException extends BusinessException {
  constructor(message?: string) {
    super(
      message || '카카오 API 응답 데이터가 유효하지 않습니다.',
      'KAKAO_RESPONSE_DATA_INVALID',
      HttpStatus.UNAUTHORIZED,
    );
  }
}

/**
 * 카카오 사용자 정보를 가져오는데 실패했을 때 발생하는 예외
 */
export class KakaoUserInfoFetchFailedException extends BusinessException {
  constructor(message?: string) {
    super(
      message || '카카오 사용자 정보를 가져오는데 실패했습니다.',
      'KAKAO_USER_INFO_FETCH_FAILED',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
