import { Request, Response, NextFunction } from 'express';
import logging from '@/config/logging';

const NAMESPACE = 'KAKAO_LOGIN';
const callbackUri = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT}&redirect_uri=${process.env.KAKAO_CALLBACk}&response_type=code`;

export default function Kakao(_: Request, res: Response, __: NextFunction) {
  logging.debug(NAMESPACE, 'CALLBACK_URL', callbackUri);
  res.status(302).redirect(callbackUri);
}
