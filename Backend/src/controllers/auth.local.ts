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
        return res.status(200).json({ message: info.message, status: 'error' });
      }
      const { id, name, email, age, gender, provider, profile } = user as ResponseLoginType;

      const { access_jwt, refresh_jwt } = tokenGenerator({ id, name, email });

      res.cookie('refresh', refresh_jwt, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        path: '/',
      });

      res.status(200).json({
        id,
        name,
        email,
        gender,
        age,
        provider,
        access_jwt,
        profile,
        message: '로그인에 성공했습니다.',
        status: 'success',
      });
      next();
    }
  )(req, res, next);
};

export default login;
