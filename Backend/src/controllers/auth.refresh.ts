import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

import tokenGenerator from '../utils/token';

const refresh = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'refresh',
    { session: false },
    (_: any, user: Express.User, info: { name: string; message: string; expiredAt?: Date }) => {
      if (!user && info instanceof Error && info.message === 'No auth token') {
        return res
          .status(403)
          .json({ status: 'error', message: 'No auth token', strategy: 'refresh' });
      }
      if (!user && info instanceof Error && info.message === 'jwt malformed') {
        return res
          .status(403)
          .json({ status: 'error', message: 'jwt malformed', strategy: 'refresh' });
      }
      if (!user && info instanceof Error && info.message === 'jwt expired') {
        return res
          .status(403)
          .json({ status: 'error', message: 'jwt expired', strategy: 'refresh' });
      }
      if (!user && info instanceof Error && info.message === 'invalid token') {
        return res
          .status(403)
          .json({ status: 'error', message: 'invalid token', strategy: 'refresh' });
      }

      if (!user) {
        return res
          .status(403)
          .json({ status: 'error', message: info.message, strategy: 'refresh' });
      }

      const { id, name, email } = user as { id: number; name: string; email: string };
      const { access_jwt } = tokenGenerator({ id, name, email });

      res.cookie('access', access_jwt, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        path: '/',
      });

      req.user = user;
      next();
    }
  )(req, res, next);
};

export default refresh;
