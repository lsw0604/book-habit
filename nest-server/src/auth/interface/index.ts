import { Gender } from '@prisma/client';

export interface KakaoAccessTokenResponse {
  access_token: string;
  token_type: string;
}

export interface KakaoUserInfoResponse {
  id: number;
  connected_at: Date;
  properties: {
    profile_image: string;
    thumbnail_image: string;
  };
  kakao_account: {
    profile_image_needs_agreement: boolean;
    profile: {
      thumbnail_image_url: string;
      profile_image_url: string;
      is_default_image: boolean;
    };
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  gender: Gender;
  birthday: Date;
  name: string;
}

export interface ValidateUserPayload {
  email: string;
  password: string;
}

export interface IsExistEmailPayload {
  email: string;
}
