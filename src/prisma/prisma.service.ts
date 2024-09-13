import {
  Injectable,
  InternalServerErrorException,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaExtensions } from 'src/common/prisma.extension';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly prisma = PrismaExtensions;

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  get client() {
    return this.prisma;
  }
}
