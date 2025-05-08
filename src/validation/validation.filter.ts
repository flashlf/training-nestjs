import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ZodError } from 'zod';
import { Response } from 'express';

@Catch(ZodError)
export class ValidationFilter<T> implements ExceptionFilter<ZodError> {
  catch(exception: ZodError, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const resp = http.getResponse<Response>();

    resp.status(400).json({
      code: 400,
      errors: exception.errors,
    });
  }
}
