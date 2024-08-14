import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new UnauthorizedException('인증 토큰이 없습니다.');

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('유효하지 않은 인증헤더입니다.');
    }

    try {
      const decoded = this.jwtService.verify(token, { secret: process.env.SECRET_ACCESS_KEY });
      request.user = decoded;
      return true;
    } catch (err) {
      let message = '유효하지 않은 토큰입니다.';
      if (err.message === 'jwt expired') {
        message = '토큰이 만료되었습니다.';
      } else if (err.message === 'jwt malformed') {
        message = '유효하지 않은 토큰 형식입니다.';
      }
      throw new UnauthorizedException(message);
    }
  }
}
