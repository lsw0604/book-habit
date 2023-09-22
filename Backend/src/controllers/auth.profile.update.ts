import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';

export default function profileUpdate(req: Request, res: Response, next: NextFunction) {
  const NAMESPACE = 'PROFILE_UPDATE';

  logging.debug(NAMESPACE, '[REQ.FILE]', req.file);

  res.status(200).json({ test: req.file });
}
