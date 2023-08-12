import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';

export default async function KakaoLogout(req: Request, res: Response, next: NextFunction) {
  const NAMESPACE = 'KAKAO_LOGOUT';

  logging.debug(NAMESPACE, '[START]');

  res.status(200);
}
