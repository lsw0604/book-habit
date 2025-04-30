import { Gender, Provider } from '@prisma/client';

export interface CreateUserPayload {
  email: string;
  name: string;
  provider: Provider;
  gender: Gender;
  password: string;
  birthday: Date;
}

export interface CreateKakaoUserPayload {
  email: string;
  name: string;
  provider: Provider;
  profile: string;
}

export interface UpdateUserPayload {
  userId: number;
  name?: string;
  gender?: Gender;
  birthday?: Date;
  profile?: string;
}
