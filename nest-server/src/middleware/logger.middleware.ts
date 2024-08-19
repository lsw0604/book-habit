import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

import { Response, Request, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware extends NestMiddleware {
  private logger = new Logger('HTTP');

  constructor() {}
}
