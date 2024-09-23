import { Injectable } from '@nestjs/common';
import { CreateUserOnMateriDto } from 'src/user-on-materi/dto/create-user-on-materi.dto';
import { UserOnMateri, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserOnMateriService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: number,
    data: CreateUserOnMateriDto,
  ): Promise<Partial<UserOnMateri>> {
    return this.prisma.userOnMateri.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async delete(
    where: Prisma.UserOnMateriWhereUniqueInput,
  ): Promise<Partial<UserOnMateri>> {
    return this.prisma.userOnMateri.delete({
      where,
    });
  }

  async findMany(): Promise<Partial<UserOnMateri>[]> {
    return this.prisma.userOnMateri.findMany();
  }

  async findOneFilteredWithSelect({
    where,
    select,
  }: {
    where: Prisma.UserOnMateriWhereInput;
    select: Prisma.UserOnMateriSelect;
  }): Promise<Partial<UserOnMateri> | null> {
    return this.prisma.userOnMateri.findFirst({
      where,
      select,
    });
  }

  async findManyFilteredWithSelect({
    where,
    select,
  }: {
    where?: Prisma.UserOnMateriWhereInput;
    select: Prisma.UserOnMateriSelect;
  }): Promise<Partial<UserOnMateri>[]> {
    return this.prisma.userOnMateri.findMany({
      where,
      select,
    });
  }
}
