import { User } from '@prisma/client';

/**
 * JWT 토큰 서명 페이로드 인터페이스
 */
export interface JwtPayload {
  id: number;
  iat?: number;
  exp?: number;
}

/**
 * 서비스에서 발급하는 Access Token / Refresh Token 세트
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * 카카오 OAuth Access Token 응답 스펙
 */
export interface KakaoAccessTokenResponse {
  access_token: string;
  token_type: string;
}

/**
 * 카카오 OAuth 유저 정보 응답 스펙 (v2/user/me)
 */
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

export type KakaoAuthUser = User & AuthTokens;

// 하위 호환 및 가독성을 위한 Alias
export type ResponseTokens = AuthTokens;
export type ResponseKakaoCallback = KakaoAuthUser;
