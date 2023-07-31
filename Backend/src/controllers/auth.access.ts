import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

const access = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'access',
    { session: false },
    (_: any, user: Express.User, info: { name: string; message: string; expiredAt?: Date }) => {
      if (!user && info instanceof Error && info.message === 'No auth token') {
        return res
          .status(403)
          .json({ status: 'error', message: 'No auth token', strategy: 'access' });
      }
      if (!user && info instanceof Error && info.message === 'jwt malformed') {
        return res
          .status(403)
          .json({ status: 'error', message: 'jwt malformed', strategy: 'access' });
      }

      if (!user && info instanceof Error && info.message === 'jwt expired') {
        return res
          .status(403)
          .json({ status: 'error', message: 'jwt expired', strategy: 'access' });
      }

      if (!user && info instanceof Error && info.message === 'invalid token') {
        return res
          .status(403)
          .json({ status: 'error', message: 'invalid token', strategy: 'access' });
      }

      if (!user) {
        return res.status(403).json({ status: 'error', message: info.message, strategy: 'access' });
      }

      req.user = user;
      next();
    }
  )(req, res, next);
};

export default access;
