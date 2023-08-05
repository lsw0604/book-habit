import { Request, Response, NextFunction } from 'express';

import logging from '../config/logging';

const NAMESPACE = 'LOGOUT';

export default function logout(req: Request, res: Response, next: NextFunction) {
  logging.info(NAMESPACE, ': START');

  res.cookie('access', {}, { path: '/', maxAge: 0, httpOnly: true });
  res.cookie('refresh', {}, { path: '/', maxAge: 0, httpOnly: true });

  logging.info(NAMESPACE, ': FINISH');

  return res.status(200).json({ message: '계정이 로그아웃됐습니다.', status: 'success' });
}