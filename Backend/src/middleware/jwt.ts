import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authChecker = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.cookies);
  if (req.headers.authorization) {
    const token = req.headers.authorization.split('Bearer ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN as string, (err) => {
      if (err) {
        res.status(403).json({ error: 'Auth Error from authChecker' });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ error: 'Auth Error from authChecker' });
  }
};
