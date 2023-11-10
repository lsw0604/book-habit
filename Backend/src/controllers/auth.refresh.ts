import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

import tokenGenerator from '@/utils/token';

const refresh = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'refresh',
    { session: false },
    (_: any, user: Express.User, info: { name: string; message: string; expiredAt?: Date }) => {
      if (!user && info instanceof Error && info.message === 'No auth token') {
        return res
          .status(403)
          .json({ status: 'error', message: '로그인이 필요합니다.', strategy: 'refresh' });
      }
      if (!user && info instanceof Error && info.message === 'jwt malformed') {
        return res
          .status(403)
          .json({ status: 'error', message: '로그인이 필요합니다.', strategy: 'refresh' });
      }
      if (!user && info instanceof Error && info.message === 'jwt expired') {
        return res
          .status(403)
          .json({ status: 'error', message: '로그인이 필요합니다.', strategy: 'refresh' });
      }
      if (!user && info instanceof Error && info.message === 'invalid token') {
        return res
          .status(403)
          .json({ status: 'error', message: '로그인이 필요합니다.', strategy: 'refresh' });
      }

      if (!user) {
        return res
          .status(403)
          .json({ status: 'error', message: info.message, strategy: 'refresh' });
      }

      const { id, name, email } = user as { id: number; name: string; email: string };
      const { access_jwt } = tokenGenerator({ id, name, email });

      req.user = { ...user, access_jwt };
      next();
    }
  )(req, res, next);
};

export default refresh;
