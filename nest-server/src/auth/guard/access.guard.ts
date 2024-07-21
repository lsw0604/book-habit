import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    let message: string;

    if (!authHeader) {
      message = 'No auth token';
      throw new UnauthorizedException(message);
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      message = 'Invalid authorization header';
      throw new UnauthorizedException(message);
    }

    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded;
      return true;
    } catch (err) {
      let message = 'Invalid token';
      if (err.message === 'jwt expired') {
        message = 'jwt expired';
      } else if (err.message === 'jwt malformed') {
        message = 'jwt malformed';
      }
      throw new UnauthorizedException(message);
    }
  }
}
