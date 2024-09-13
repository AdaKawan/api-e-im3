import { Injectable } from '@nestjs/common';
import { CreateUserOnKelaDto } from './dto/create-user-on-kela.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, UserOnKelas } from '@prisma/client';
import { UpdateUserOnKelasDto } from './dto/update-user-on-kelas.dto';
import { UserOnKelasData } from './entities/user-on-kela.entity';

@Injectable()
export class UserOnKelasService {
  constructor(private prisma: PrismaService) {}

  async create(
    createUserOnKelaDto: CreateUserOnKelaDto,
  ): Promise<UserOnKelasData> {
    return this.prisma.userOnKelas.create({
      data: createUserOnKelaDto,
      select: {
        user: {
          select: {
            nama_lengkap: true,
          },
        },
        kelas: {
          select: {
            nama_kelas: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.userOnKelas.findMany({
      select: {
        user: {
          select: {
            nama_lengkap: true,
          },
        },
        kelas: {
          select: {
            nama_kelas: true,
          },
        },
      },
    });
  }

  async findManyFilteredWithSelect({
    select,
    where,
  }: {
    select: Prisma.UserOnKelasSelect;
    where: Prisma.UserOnKelasWhereInput;
  }) {
    return this.prisma.userOnKelas.findMany({
      where,
      select,
    });
  }

  async findManyFilteredWithInclude({
    include,
    where,
  }: {
    include: Prisma.UserOnKelasInclude;
    where: Prisma.UserOnKelasWhereInput;
  }) {
    return this.prisma.userOnKelas.findMany({
      where,
      include,
    });
  }

  async findOneFilteredWithSelect({
    where,
    select,
  }: {
    where: Prisma.UserOnKelasWhereInput;
    select: Prisma.UserOnKelasSelect;
  }) {
    return this.prisma.userOnKelas.findFirst({
      where,
      select,
    });
  }

  async findOneFilteredWithInclude({
    include,
    where,
  }: {
    include: Prisma.UserOnKelasInclude;
    where: Prisma.UserOnKelasWhereInput;
  }) {
    return this.prisma.userOnKelas.findFirst({
      where,
      include,
    });
  }

  async update({
    updateUserOnKelasDto,
    where,
  }: {
    updateUserOnKelasDto: UpdateUserOnKelasDto;
    where: Prisma.UserOnKelasWhereUniqueInput;
  }) {
    return this.prisma.userOnKelas.update({
      data: {
        userId: updateUserOnKelasDto.newUserId,
        kelasId: updateUserOnKelasDto.newKelasId,
      },
      where,
    });
  }

  async remove(where: Prisma.UserOnKelasWhereUniqueInput) {
    return this.prisma.userOnKelas.delete({
      where,
    });
  }
}
