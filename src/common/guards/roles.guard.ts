import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private relfecor: Reflector,
    private jwtService: JwtService,
  ) {}

  matchRoles(roles: string[], userRole: string) {
    return roles.some((role) => role === userRole);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.relfecor.get<string[]>('roles', context.getHandler());
    if (!roles) {
      true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      throw new UnauthorizedException();
    }

    request.role = `${user.role}`;

    return this.matchRoles(roles, `${user.role}`);
  }
}
