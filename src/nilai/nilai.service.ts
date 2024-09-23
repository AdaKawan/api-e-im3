import { Injectable } from '@nestjs/common';
import { CreateNilaiDto } from 'src/nilai/dto/create-nilai.dto';
import { UpdateNilaiDto } from 'src/nilai/dto/update-nilai.dto';
import { Nilai, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NilaiService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateNilaiDto): Promise<Partial<Nilai>> {
    return this.prisma.nilai.create({
      data,
    });
  }

  async update({
    where,
    data,
  }: {
    where: Prisma.NilaiWhereUniqueInput;
    data: UpdateNilaiDto;
  }): Promise<Partial<Nilai>> {
    return this.prisma.nilai.update({
      where,
      data,
    });
  }

  async delete(where: Prisma.NilaiWhereUniqueInput): Promise<Partial<Nilai>> {
    return this.prisma.nilai.delete({
      where,
    });
  }

  async findOne(id: number): Promise<Partial<Nilai> | null> {
    return this.prisma.nilai.findUnique({
      where: { id },
    });
  }

  async findMany(): Promise<Partial<Nilai>[]> {
    return this.prisma.nilai.findMany();
  }

  async findOneFilteredWithSelect({
    where,
    select,
  }: {
    where: Prisma.NilaiWhereInput;
    select: Prisma.NilaiSelect;
  }): Promise<Partial<Nilai> | null> {
    return this.prisma.nilai.findFirst({
      where,
      select,
    });
  }

  async findManyFilteredWithSelect({
    where,
    select,
  }: {
    where?: Prisma.NilaiWhereInput;
    select: Prisma.NilaiSelect;
  }): Promise<Partial<Nilai>[]> {
    return this.prisma.nilai.findMany({
      where,
      select,
    });
  }

  async findOneFilteredWithInclude({
    where,
    include,
  }: {
    where: Prisma.NilaiWhereInput;
    include: Prisma.NilaiInclude;
  }): Promise<Partial<Nilai> | null> {
    return this.prisma.nilai.findFirst({
      where,
      include,
    });
  }

  async findManyFilteredWithInclude({
    where,
    include,
  }: {
    where?: Prisma.NilaiWhereInput;
    include: Prisma.NilaiInclude;
  }): Promise<Partial<Nilai>[]> {
    return this.prisma.nilai.findMany({
      where,
      include,
    });
  }
}
