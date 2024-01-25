import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

import tokenGenerator from '../utils/token';
import { ResponseLoginType } from '../types';

const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'local',
    { session: false },
    (_: any, user: Express.User, info: { message: string }) => {
      if (!user) {
        return res.status(403).json({ message: info.message, status: 'error' });
      }
      const { id, name, email } = user as ResponseLoginType;

      const { access_jwt, refresh_jwt } = tokenGenerator({ id, name, email });

      res.cookie('access', access_jwt, {
        maxAge: 1000 * 60 * 60,
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite: 'lax',
      });

      res.cookie('refresh', refresh_jwt, {
        maxAge: 1000 * 60 * 60 * 24,
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite: 'lax',
      });

      res.status(200).json({
        ...user,
        message: info.message,
        status: 'success',
      });
      next();
    }
  )(req, res, next);
};

export default login;
