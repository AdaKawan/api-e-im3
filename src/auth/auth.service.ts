import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidV4 } from 'uuid';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role, User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private refresTokenService: RefreshTokenService,
    private jwtService: JwtService,
  ) { }

  async login(user: User & { role: Role }) {
    const jti = uuidV4();

    const userId = Number(user.id);

    const payload = {
      sub: userId,
      username: user.username,
      email: user.email,
      role: user.role.role,
      jti: jti,
    };

    await this.refresTokenService.saveUsedJti(jti, userId);

    return {
      refresh_token: await this.jwtService.signAsync(payload),
    };
  }

  async logout(jti: string) {
    await this.refresTokenService.removeByJti(jti);
  }

  async autoLogin(
    user: {
      id: number;
      username: string;
      email: string;
      role: string;
    },
    oldJti: string,
    currentTime: number,
  ) {
    try {
      const payload = {
        sub: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        jti: oldJti,
      };

      const newJti = uuidV4();

      await this.refresTokenService.updateUsedJti(oldJti, newJti, currentTime);

      payload.jti = newJti;

      return {
        refresh_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
