import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

const access = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'access',
    { session: false },
    (_: any, user: Express.User, info: { name: string; message: string; expiredAt?: Date }) => {
      if (!!info) {
        return res
          .status(403)
          .json({ name: info.name, message: info.message, expiredAt: info.expiredAt });
      }
      res.status(200).json({ ...user });
      next();
    }
  )(req, res, next);
};

export default access;
