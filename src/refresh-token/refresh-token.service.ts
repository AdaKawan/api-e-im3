import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RefreshToken } from '@prisma/client';
import * as moment from 'moment-timezone';

@Injectable()
export class RefreshTokenService {
  constructor(private prisma: PrismaService) {}

  async isJtiUsed(jti: string): Promise<boolean> {
    const token = await this.prisma.refreshToken.findMany({
      where: {
        jti: jti,
      },
    });
    return !!token;
  }

  async findJti(jti: string): Promise<RefreshToken> {
    const token = await this.prisma.refreshToken.findFirst({
      where: {
        jti: jti,
      },
    });

    return token;
  }

  async saveUsedJti(jti: string, userId: number) {
    const now = moment().add(7, 'days');
    const timeZone = 'Asia/Jakarta';

    const localTime = now.tz(timeZone);
    const localString = localTime.format('YYYY-MM-DDTHH:mm:ss.SSSZ');

    await this.prisma.refreshToken.create({
      data: {
        userId: userId,
        jti: jti,
        expiredDate: localString,
      },
    });
  }

  async updateUsedJti(oldJti: string, newJti: string) {
    const now = moment().add(7, 'days');
    const timeZone = 'Asia/Jakarta';

    const localTime = now.tz(timeZone);
    const localString = localTime.format('YYYY-MM-DDTHH:mm:ss.SSSZ');

    await this.prisma.refreshToken.update({
      where: {
        jti: oldJti,
      },
      data: {
        jti: newJti,
        expiredDate: localString,
      },
    });
  }

  async updateOnlyJti(oldJti: string, newJti: string) {
    await this.prisma.refreshToken.update({
      where: {
        jti: oldJti,
      },
      data: {
        jti: newJti,
      },
    });
  }

  async removeExpiredJtis() {
    await this.prisma.refreshToken.deleteMany({
      where: {
        expiredDate: {
          lt: new Date(),
        },
      },
    });
  }

  async findExpiredJtis() {
    return await this.prisma.refreshToken.findMany({
      where: {
        expiredDate: {
          lt: new Date(Date.now()),
        },
      },
    });
  }

  async allJti() {
    return await this.prisma.refreshToken.findMany({
      where: {
        expiredDate: {
          lt: `${Date.now()}`,
        },
      },
    });
  }

  async removeByJti(jti: string) {
    await this.prisma.refreshToken.delete({
      where: {
        jti,
      },
    });
  }
}
