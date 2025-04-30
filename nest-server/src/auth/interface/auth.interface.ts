import { Gender, User } from '@prisma/client';
import { ResponseTokens, ReturnAccessToken } from './token.interface';

export type ResponseLogin = ResponseTokens & User;
export type ResponseRefresh = ReturnAccessToken & User;

export interface RegisterPayload {
  email: string;
  password: string;
  gender: Gender;
  birthday: Date;
  name: string;
}

export type ResponseRegister = ResponseTokens & User;
