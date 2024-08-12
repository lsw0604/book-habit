import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = HttpStatus.BAD_REQUEST;

    let message = 'Database 에러';

    if (exception.code === 'P2002') {
      message = 'Unique constraint failed on the fields: ' + exception.meta?.target;
    }

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
