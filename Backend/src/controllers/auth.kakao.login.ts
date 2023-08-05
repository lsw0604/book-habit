import { NextFunction, Request, Response } from 'express';
import { connectionPool } from '../config/database';
import passport from 'passport';

const kakao = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('kakao', (_: any, user: Express.User, info: { message: string }) => {
    console.log('user', user);
    console.log('info', info);

    res.status(200).redirect('/');
  })(req, res, next);
};

export default kakao;
