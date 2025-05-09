import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { request } from 'http';

export const Auth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const reqs = ctx.switchToHttp().getRequest();
    return reqs.user;
  },
);
