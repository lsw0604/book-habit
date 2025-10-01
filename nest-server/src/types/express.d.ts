import { User as PrismaUser } from '@prisma/client';

export type AuthUser = PrismaUser & {
  accessToken: string;
  refreshToken: string;
};

declare global {
  namespace Express {
    export interface User extends AuthUser {}

    export interface Request {
      user?: User;
    }
  }
}

export {};
