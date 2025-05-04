import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalGuard extends AuthGuard('access') {
  constructor() {
    super();
  }

  handleRequest(_err: any, user: any, _info: any, _context: ExecutionContext) {
    // 인증에 실패해도 오류를 던지지 않고 undefined를 반환
    return user || undefined;
  }

  // canActivate를 재정의하여 항상 true를 반환 (항상 접근 허용)
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 부모 클래스의 canActivate 호출
    await super.canActivate(context);
    // 항상 접근 허용
    return true;
  }
}
