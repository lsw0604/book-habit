import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export abstract class BaseJwtGuard extends AuthGuard('jwt') {
  protected static readonly INVALID_TOKEN_MESSAGE = '유효한 토큰이 아닙니다.';
  protected static readonly EXPIRED_TOKEN_MESSAGE = '토큰이 만료되었습니다.';
  protected static readonly MALFORMED_TOKEN_MESSAGE = '유효하지 않은 토큰 형식입니다.';
  protected static readonly MISSING_TOKEN_MESSAGE = '토큰이 제공되지 않았습니다.';
  protected static readonly UNKNOWN_ERROR_MESSAGE = '인증 중 알 수 없는 오류가 발생했습니다.';

  protected readonly logger = new Logger(BaseJwtGuard.name);

  constructor(strategy: string, loggerName: string) {
    super(strategy);
    this.logger = new Logger(loggerName);
  }

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
        throw new UnauthorizedException(this.getExpiredTokenMessage());
      } else if (info && info.name === 'JsonWebTokenError') {
        this.logger.warn(`Invalid token: ${info.message}`);
        throw new UnauthorizedException(this.getInvalidTokenMessage());
      } else if (info && info.message === 'No auth token') {
        this.logger.warn('Missing token');
        throw new UnauthorizedException(this.getMissingTokenMessage());
      } else if (err) {
        this.logger.error(`Authentication error: ${err.message}`);
        throw new UnauthorizedException(this.getUnknownErrorMessage());
      }
    }

    try {
      return super.handleRequest(err, user, info, context, status);
    } catch (error) {
      this.logger.error(`Authentication error: ${error.message}`);
      throw new UnauthorizedException(this.getUnknownErrorMessage());
    }
  }

  protected getInvalidTokenMessage(): string {
    return BaseJwtGuard.INVALID_TOKEN_MESSAGE;
  }

  protected getExpiredTokenMessage(): string {
    return BaseJwtGuard.EXPIRED_TOKEN_MESSAGE;
  }

  protected getMalformedTokenMessage(): string {
    return BaseJwtGuard.MALFORMED_TOKEN_MESSAGE;
  }

  protected getMissingTokenMessage(): string {
    return BaseJwtGuard.MISSING_TOKEN_MESSAGE;
  }

  protected getUnknownErrorMessage(): string {
    return BaseJwtGuard.UNKNOWN_ERROR_MESSAGE;
  }
}
