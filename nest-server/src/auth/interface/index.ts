import { User } from '@prisma/client';
import { ResponseTokens } from './token.interface';

export * from './token.interface';
export * from './auth.interface';

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

export type ResponseKakaoCallback = User & ResponseTokens;
