import { NextFunction, Request, Response } from 'express';
import { connectionPool } from '../config/database';
import passport from 'passport';

const kakao = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'kakao',
    { session: false },
    (_: any, user: Express.User, info: { message: string }) => {
      console.log('user', user);
      console.log('info', info);

      res.status(200).redirect('http://localhost:5173');
    }
  )(req, res, next);
};

export default kakao;
