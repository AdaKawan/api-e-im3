import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { GuruData } from 'src/common/types/user.types';
import * as argon2 from 'argon2';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async getAllGuru(): Promise<GuruData[]> {
    const guru = await this.prisma.client.user.getAllGuru();
    return guru;
  }
  async getAllSiswa(): Promise<Partial<User>[]> {
    const siswa = await this.prisma.client.user.getAllSiswa();
    return siswa;
  }

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const { confPassword, ...data } = createUserDto;
    data.password = await argon2.hash(createUserDto.password);
    return this.prisma.user.create({
      data,
    });
  }

  async findOne(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findFirst({
      where,
    });
  }

  async findAllByUniqueInput(
    where: Prisma.UserWhereUniqueInput,
  ): Promise<User[]> {
    return this.prisma.user.findMany({
      where,
    });
  }

  async findOneWithoutPassword(
    where: Prisma.UserWhereUniqueInput,
  ): Promise<Partial<User> | null> {
    return this.prisma.user.findUnique({
      where,
      select: {
        id: true,
        nama_lengkap: true,
        email: true,
        username: true,
        roleId: true,
        createdAt: true,
        updatedAt: true,
        asal_sekolah: true,
        isActive: true,
        materi: true,
        jit: true,
      },
    });
  }

  async findAllByUniqueInputWithoutPassword(
    where: Prisma.UserWhereUniqueInput,
  ) {
    return this.prisma.user.findMany({
      where,
      select: {
        id: true,
        nama_lengkap: true,
        email: true,
        username: true,
        roleId: true,
        createdAt: true,
        updatedAt: true,
        asal_sekolah: true,
        isActive: true,
        materi: true,
        jit: true,
      },
    });
  }

  async findAll(): Promise<Partial<User>[]> {
    return this.prisma.user.findMany({
      where: {
        roleId: {
          in: [2, 3],
        },
      },
      select: {
        id: true,
        nama_lengkap: true,
        email: true,
        username: true,
        isActive: true,
        asal_sekolah: true,
        role: {
          select: {
            role: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { confPassword, ...data } = updateUserDto;
    data.password = await argon2.hash(updateUserDto.password);
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async updateUserProfile(id: number, updateUserProfileDto: UpdateUserProfileDto): Promise<User> {
    const { confPassword, ...data } = updateUserProfileDto;
    data.password = await argon2.hash(updateUserProfileDto.password);
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async findOneWithSelectedField(
    where: Prisma.UserWhereInput,
    select: Prisma.UserSelect,
  ): Promise<Partial<User | null>> {
    return this.prisma.user.findFirst({
      where,
      select,
    });
  }

  async findOneWithIncludeedField(
    where: Prisma.UserWhereInput,
    include: Prisma.UserInclude,
  ) {
    return this.prisma.user.findFirst({
      where,
      include,
    });
  }

  async findAllWithSelectedField(data: {
    where: Prisma.UserWhereUniqueInput | null;
    select: Prisma.UserSelect;
  }) {
    return this.prisma.user.findMany({
      where: data.where,
      select: data.select,
    });
  }

  async findManyStudents(role: string, userId: number) {
    if (role === 'admin' || role === 'guru') {
      return this.prisma.user.findMany({
        where: {
          role: {
            id: 3,
          },
        },
      });
    }

    throw new ForbiddenException('Akses tidak diizinkan.');
  }

  async findAllWithIncludeField(data: {
    where: Prisma.UserWhereUniqueInput | null;
    include: Prisma.UserInclude;
  }) {
    return this.prisma.user.findMany({
      where: data.where,
      include: data.include,
    });
  }

  async toggleActiveStatus(id: number, isActive: boolean): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { isActive },
    });
  }
}
