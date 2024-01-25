import { Request, Response, NextFunction } from 'express';

import logging from '../config/logging';

const NAMESPACE = 'LOGOUT';

export default function logout(_: Request, res: Response, __: NextFunction) {
  res.cookie('access', {}, { path: '/', maxAge: 0, httpOnly: true, secure: true, sameSite: 'lax' });
  res.cookie(
    'refresh',
    {},
    { path: '/', maxAge: 0, httpOnly: true, secure: true, sameSite: 'lax' }
  );

  logging.info(NAMESPACE, '[계정이 로그아웃 됐습니다.]');

  return res.status(200).json({ message: '계정이 로그아웃됐습니다.', status: 'success' });
}
