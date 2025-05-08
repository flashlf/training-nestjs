import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class LogMiddleware implements NestMiddleware<Request, Response> {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {}
  use(req: any, res: any, next: () => void) {
    this.logger.info(`Receive request for URL: ${req.url}`);
    next();
  }
}
