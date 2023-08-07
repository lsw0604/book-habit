import { Request, Response, NextFunction } from 'express';

export default function Kakao(req: Request, res: Response, next: NextFunction) {
  const callbackUri = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT}&redirect_uri=${process.env.KAKAO_CALLBACk}&response_type=code`;
  res.status(302).redirect(callbackUri);
}
