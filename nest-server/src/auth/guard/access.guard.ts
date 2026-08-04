import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { handleJwtErrors } from 'src/common/utils/auth/jwt.util';
import { UnknownTokenException } from 'src/common/exceptions/jwt';

@Injectable()
export class AccessGuard extends AuthGuard('access') {
  constructor() {
    super();
  }

  handleRequest<T = any>(err, user, info, context, status): T {
    handleJwtErrors(err, user, info);

    try {
      return super.handleRequest(err, user, info, context, status);
    } catch (error) {
      throw new UnknownTokenException(error.message);
    }
  }
}
