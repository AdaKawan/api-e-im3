import { Injectable } from '@nestjs/common';
import { CreateMateriDto } from 'src/materi/dto/create-materi.dto';
import { UpdateMateriDto } from 'src/materi/dto/update-materi.dto';
import { Materi, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MateriService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: number,
    data: CreateMateriDto,
    files: any[],
  ): Promise<Partial<Materi>> {
    return this.prisma.materi.create({
      data: {
        ...data,
        files,
        creatorId: userId,
      },
    });
  }

  async update({
    where,
    data,
    files,
  }: {
    where: Prisma.MateriWhereUniqueInput;
    data: UpdateMateriDto;
    files: any[];
  }): Promise<Partial<Materi>> {
    return this.prisma.materi.update({
      where,
      data: {
        ...data,
        files: files,
      },
    });
  }

  async delete(where: Prisma.MateriWhereUniqueInput): Promise<Partial<Materi>> {
    return this.prisma.materi.delete({
      where,
    });
  }

  async findOne(id: number): Promise<Partial<Materi> | null> {
    return this.prisma.materi.findUnique({
      where: { id },
    });
  }

  async findMany(): Promise<Partial<Materi>[]> {
    return this.prisma.materi.findMany();
  }

  async findOneFilteredWithSelect({
    where,
    select,
  }: {
    where: Prisma.MateriWhereInput;
    select: Prisma.MateriSelect;
  }): Promise<Partial<Materi> | null> {
    return this.prisma.materi.findFirst({
      where,
      select,
    });
  }

  async findManyFilteredWithSelect({
    where,
    select,
  }: {
    where?: Prisma.MateriWhereInput;
    select: Prisma.MateriSelect;
  }): Promise<Partial<Materi>[]> {
    return this.prisma.materi.findMany({
      where,
      select,
    });
  }

  async findOneFilteredWithInclude({
    where,
    include,
  }: {
    where: Prisma.MateriWhereInput;
    include: Prisma.MateriInclude;
  }): Promise<Partial<Materi> | null> {
    return this.prisma.materi.findFirst({
      where,
      include,
    });
  }

  async findManyFilteredWithInclude({
    where,
    include,
  }: {
    where?: Prisma.MateriWhereInput;
    include: Prisma.MateriInclude;
  }): Promise<Partial<Materi>[]> {
    return this.prisma.materi.findMany({
      where,
      include,
    });
  }
}
