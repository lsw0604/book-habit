import { NextFunction, Request, Response } from 'express';
import { connectionPool } from '../DB/index';

interface KakaoRequest {
  provider: 'kakao';
  id: number;
  username: string;
  displayName: string;
  _raw: string;
  _json: {
    id: number;
    connected_at: string;
    properties: {
      nickname: string;
      profile_image: string;
      thumbnail_image: string;
    };
    kakao_account: {
      profile_nickname_needs_agreement: boolean;
      profile_image_needs_agreement: boolean;
      profile: [Object];
      has_email: boolean;
      email_needs_agreement: boolean;
      has_birthday: boolean;
      birthday_needs_agreement: boolean;
      birthday: string;
      birthday_type: string;
      has_gender: boolean;
      gender_needs_agreement: boolean;
      gender: boolean;
    };
  };
}

export default async function (
  req: KakaoRequest,
  res: Response,
  next: NextFunction
) {
  const { provider, id, username } = req;
  try {
    connectionPool.beginTransaction();
  } catch (error) {}

  console.log('login', req);
}
