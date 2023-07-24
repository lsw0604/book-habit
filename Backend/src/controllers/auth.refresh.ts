import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

import tokenGenerator from '../utils/token';

const refresh = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'refresh',
    { session: false },
    (_: any, user: Express.User, info: { name: string; message: string; expiredAt?: Date }) => {
      if (!user) {
        return res
          .status(401)
          .json({ name: info.name, message: info.message, expiredAt: info.expiredAt });
      }
      const { id, name, email } = user as { id: number; name: string; email: string };
      const { access_jwt } = tokenGenerator({ id, name, email });

      res.cookie('access', access_jwt, {
        maxAge: 1000 * 60 * 60 * 60,
        path: '/',
      });
      res.status(200).json({
        ...user,
        message: 'REFRESH_TOKEN_VERIFIED',
        status: 'success',
      });
      next();
    }
  )(req, res, next);
};

export default refresh;
