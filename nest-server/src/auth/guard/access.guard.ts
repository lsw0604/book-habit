import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AccessGuard extends AuthGuard('access') {
  private readonly logger = new Logger(AccessGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.debug('AccessGuard.canActivate called');
    try {
      const result = await super.canActivate(context);
      this.logger.debug(`canActivate result: ${result}`);
      return result as boolean;
    } catch (error) {

      
      this.logger.error(`AccessGuard error: ${error.message}`);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
