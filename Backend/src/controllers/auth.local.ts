import { NextFunction, Request, Response } from 'express';
import tokenGenerator from '../utils/token';

const login = (req: Request, res: Response, next: NextFunction) => {
  const { id, name, email } = req.user as { id: number; name: string; email: string };

  const { access_jwt, refresh_jwt } = tokenGenerator({ id, name, email });

  res.cookie('access', access_jwt, { path: '/', maxAge: 60 * 60 * 1000, httpOnly: true });
  res.cookie('refresh', refresh_jwt, { path: '/', maxAge: 24 * 60 * 60 * 1000, httpOnly: true });

  res.status(200).json({ id, name, email });
};

export default login;
