import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from './role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private relfector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles: string[] = this.relfector.get(Roles, context.getHandler());

    if (!roles) {
      return true;
    }

    const user = context.switchToHttp().getRequest().user;
    return this.roles.indexOf(user.role) !== -1;
  }
}
