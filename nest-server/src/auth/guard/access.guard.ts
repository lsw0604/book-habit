import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AccessGuard extends AuthGuard('access') {
  private readonly logger = new Logger(AccessGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.debug('AccessGuard 호출');
    try {
      const result = await super.canActivate(context);
      this.logger.debug(`canActivate result: ${result}`);
      return result as boolean;
    } catch (error) {
      this.logger.error(`AccessGuard error: ${error.message}`);
      let message = '유효한 토큰이 아닙니다.';
      if (error.message === 'jwt expired') {
        message = '토큰이 만료되었습니다.';
      } else if (error.message === 'jwt malformed') {
        message = '유효하지 않은 토큰 형식입니다.';
      }
      throw new UnauthorizedException(message);
    }
  }
}
