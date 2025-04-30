import { TokenExpiredError } from 'jsonwebtoken';
import {
  TokenExpiredException,
  InvalidTokenException,
  MissingTokenException,
  UnknownTokenException,
} from 'src/common/exceptions/jwt';

/**
 * JWT 인증 가드에서 발생하는 공통 에러를 처리하는 유틸리티 함수
 *
 * @param err 에러 객체
 * @param user 사용자 객체
 * @param info 추가 정보 객체
 * @throws 커스텀 인증 예외
 */
export function handleJwtErrors(err: any, user: any, info: any): void {
  if (err || !user) {
    if (info instanceof TokenExpiredError) {
      throw new TokenExpiredException();
    } else if (info && info.name === 'JsonWebTokenError') {
      throw new InvalidTokenException(info.message);
    } else if (info && info.message === 'No auth token') {
      throw new MissingTokenException();
    } else if (err) {
      throw new UnknownTokenException(err.message);
    }
  }
}
