import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(InternalServerErrorException)
export class InternalServerErrorExceptionFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const message = exceptionResponse['message'] ?? 'Internal server error';

    response.status(status).json({
      status: 'error',
      message: message,
    });
  }
}
