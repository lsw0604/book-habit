import { User } from '@prisma/client';

export interface TokenInterface {
  id: number;
  iat: number;
  exp: number;
}

export interface AccessTokenExtendsUser extends User {
  accessToken: string;
}

export interface RefreshTokenExtendsUser extends User {
  refreshToken: string;
}
