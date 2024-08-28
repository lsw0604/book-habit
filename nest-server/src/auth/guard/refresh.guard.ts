import { ExecutionContext, Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class RefreshGuard extends AuthGuard('refresh') {
  private static readonly INVALID_TOKEN_MESSAGE = '유효한 토큰이 아닙니다.';
  private static readonly EXPIRED_TOKEN_MESSAGE = '토큰이 만료되었습니다.';
  private static readonly MALFORMED_TOKEN_MESSAGE = '유효하지 않은 토큰 형식입니다.';
  private static readonly MISSING_TOKEN_MESSAGE = '토큰이 제공되지 않았습니다.';
  private static readonly UNKNOWN_ERROR_MESSAGE = '인증 중 알 수 없는 오류가 발생했습니다.';

  private readonly logger = new Logger(RefreshGuard.name);

  handleRequest<T = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): T {
    if (err || !user) {
      if (info instanceof TokenExpiredError) {
        this.logger.warn(`Token expired: ${info.message}`);
        throw new UnauthorizedException(RefreshGuard.EXPIRED_TOKEN_MESSAGE);
      } else if (info && info.name === 'JsonWebTokenError') {
        this.logger.warn(`Invalid token: ${info.message}`);
        throw new UnauthorizedException(RefreshGuard.INVALID_TOKEN_MESSAGE);
      } else if (info && info.message === 'No auth token') {
        this.logger.warn('Missing token');
        throw new UnauthorizedException(RefreshGuard.MISSING_TOKEN_MESSAGE);
      } else if (err) {
        this.logger.error(`Authentication error: ${err.message}`);
        throw new UnauthorizedException(RefreshGuard.UNKNOWN_ERROR_MESSAGE);
      }
    }

    try {
      return super.handleRequest(err, user, info, context, status);
    } catch (error) {
      this.logger.error(`Unexpected error in AccessGuard: ${error.message}`);
      throw new UnauthorizedException(RefreshGuard.UNKNOWN_ERROR_MESSAGE);
    }
  }
}
