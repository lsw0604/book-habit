import { NextFunction, Request, Response } from 'express';
import tokenGenerator from '../utils/token';
import passport from 'passport';

const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'local',
    { session: false },
    (_: any, user: Express.User, info: { message: string }) => {
      if (!user) {
        return res.status(200).json({ message: info.message, status: 'failure' });
      }
      const { id, name, email } = user as { id: number; name: string; email: string };

      const { access_jwt, refresh_jwt } = tokenGenerator({ id, name, email });

      res.status(200).json({
        id,
        name,
        email,
        message: '로그인에 성공했습니다.',
        status: 'success',
        access: access_jwt,
        refresh: refresh_jwt,
      });
      next();
    }
  )(req, res, next);
};

export default login;
