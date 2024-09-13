import { Injectable } from '@nestjs/common';
import { CreateKelaDto } from './dto/create-kela.dto';
import { UpdateKelaDto } from './dto/update-kela.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Kelas, Prisma } from '@prisma/client';

@Injectable()
export class KelasService {
  constructor(private prisma: PrismaService) {}

  async create(createKelaDto: CreateKelaDto) {
    return this.prisma.kelas.create({
      data: createKelaDto,
    });
  }

  async findAllWithSelectedField(data?: {
    where?: Prisma.KelasWhereInput;
    select?: Prisma.KelasSelect;
  }): Promise<Kelas[]> {
    const { where, select } = data || {};

    return this.prisma.kelas.findMany({
      where,
      select,
    });
  }

  async findAllWithIncludeField(data?: {
    where?: Prisma.KelasWhereInput;
    include?: Prisma.KelasInclude;
  }) {
    const { where, include } = data;
    return this.prisma.kelas.findMany({
      where,
      include,
    });
  }

  async findOneWithSelectedField(data: {
    where: Prisma.KelasWhereUniqueInput;
    select?: Prisma.KelasSelect;
  }) {
    const { where, select } = data;
    return this.prisma.kelas.findUnique({
      where,
      select,
    });
  }

  async findOneWithIncludedField(data: {
    where: Prisma.KelasWhereUniqueInput;
    include?: Prisma.KelasInclude;
  }): Promise<Kelas> {
    const { where, include } = data;
    return this.prisma.kelas.findUnique({
      where,
      include,
    });
  }

  async update(id: number, updateKelaDto: UpdateKelaDto) {
    return this.prisma.kelas.update({
      where: { id },
      data: updateKelaDto,
    });
  }

  async remove(id: number) {
    await this.prisma.kelas.delete({
      where: { id },
    });
  }
}
