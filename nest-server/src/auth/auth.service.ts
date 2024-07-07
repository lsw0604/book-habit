import { Injectable } from '@nestjs/common';
import { AuthSignInDto } from './dto/auth.signin.dto';

@Injectable()
export class AuthService {
  async signIn(dto: AuthSignInDto) {
    return `${dto.email} ${dto.password}`;
  }
}
