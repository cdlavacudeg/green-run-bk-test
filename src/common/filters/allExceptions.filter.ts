import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const isHttpExection = exception instanceof HttpException;
    const isKnowPrismaExeption = exception instanceof PrismaClientKnownRequestError;
    const isKnowPrismaValidatonError = exception instanceof PrismaClientValidationError;
    console.log(exception);
    let httpStatus: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Error en el servidor';
    let error: '';

    if (isHttpExection) {
      httpStatus = exception.getStatus();
      const response = JSON.parse(JSON.stringify(exception.getResponse()));
      error = response.message ? response.message : 'Error ';
      message = response.error ? response.error : exception.message;
    }

    if (isKnowPrismaExeption) {
      httpStatus = HttpStatus.CONFLICT;
      message = `Prisma error code: ${exception.code}`;
    }

    if (isKnowPrismaValidatonError) {
      httpStatus = HttpStatus.CONFLICT;
      message = `Prisma error code: ${exception.message}`;
    }

    const responseBody = {
      statusCode: httpStatus,
      message,
      error,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
