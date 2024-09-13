import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const headerAut = request.headers.authorization;
    if (!headerAut) {
      throw new UnauthorizedException();
    }
    const splitHeader = headerAut.split(' ');
    const refreshToken = splitHeader[1];

    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);

      const { sub, username, email, role, jti } = payload;

      const modelJti = await this.refreshTokenService.findJti(jti);

      if (!modelJti) throw new UnauthorizedException('Mohon Login');

      if (modelJti.expiredDate <= new Date())
        throw new UnauthorizedException('Sesi sudah habis');

      const jtiAccessToken = uuidV4();

      request.accessToken = await this.jwtService.signAsync(
        {
          sub,
          username,
          email,
          role,
          jti: jtiAccessToken,
        },
        {
          secret: process.env.ACCESS_TOKEN,
          expiresIn: '25s',
        },
      );
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
