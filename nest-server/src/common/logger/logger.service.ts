import { Injectable, LoggerService as NestLoggerService, Scope } from '@nestjs/common';
import { createLogger, format, transports, Logger } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService implements NestLoggerService {
  private context?: string;
  private logger: Logger;

  constructor() {
    const logFormat = format.printf(({ level, message, timestamp, context, ...meta }) => {
      return `${timestamp} [${context || 'Application'}] ${level}: ${message} ${
        Object.keys(meta).length ? JSON.stringify(meta) : ''
      }`;
    });

    this.logger = createLogger({
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        logFormat,
      ),
      transports: [
        new transports.Console({
          format: format.combine(format.colorize(), logFormat),
        }),
        new DailyRotateFile({
          filename: 'logs/application-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
        new DailyRotateFile({
          level: 'error',
          filename: 'logs/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
    });
  }

  setContext(context: string) {
    this.context = context;
    return this;
  }

  log(message: string, ...meta: any[]) {
    this.logger.info(message, { context: this.context, ...meta });
  }

  error(message: string, trace?: string, ...meta: any[]) {
    this.logger.error(message, { context: this.context, trace, ...meta });
  }

  warn(message: string, ...meta: any[]) {
    this.logger.warn(message, { context: this.context, ...meta });
  }

  debug(message: string, ...meta: any[]) {
    this.logger.debug(message, { context: this.context, ...meta });
  }

  verbose(message: string, ...meta: any[]) {
    this.logger.verbose(message, { context: this.context, ...meta });
  }
}
