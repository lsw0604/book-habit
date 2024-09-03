export interface IKakaoId {
  kakao_email: string;
  kakao_account: {
    profile_image_needs_agreement: boolean;
    profile: {
      thumbnail_image_url: string;
      profile_image_url: string;
      is_default_image: boolean;
    };
  };
}

export interface IKakaoAccessToken {
  accessToken: string;
}
