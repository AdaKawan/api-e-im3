import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePelajaranDto } from 'src/pelajaran/dto/create-pelajaran.dto';
import { UpdatePelajaranDto } from 'src/pelajaran/dto/update-pelajaran.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Pelajaran, Prisma } from '@prisma/client';

@Injectable()
export class PelajaranService {
  constructor(private prisma: PrismaService) { }

  async create(
    data: CreatePelajaranDto,
    userId: bigint,
    role: string,
  ): Promise<Partial<Pelajaran>> {
    if (role === 'admin') {
      return this.prisma.pelajaran.create({
        data: {
          ...data,
          creatorId: userId,
        },
      });
    }

    if (role === 'guru') {
      const isInSchool = await this.prisma.user.findFirst({
        where: {
          id: userId,
        },
      });

      if (isInSchool.asal_sekolah === data.asal_sekolah) {
        throw new ForbiddenException(
          'Anda tidak memiliki akses untuk membuat pelajaran pada sekolah ini.',
        );
      }

      return this.prisma.pelajaran.create({
        data: {
          ...data,
          creatorId: userId,
        },
      });
    }

    throw new ForbiddenException('Peran tidak dikenali.');
  }

  async update({
    where,
    data,
  }: {
    where: Prisma.PelajaranWhereUniqueInput;
    data: UpdatePelajaranDto;
  }): Promise<Partial<Pelajaran>> {
    return this.prisma.pelajaran.update({
      where,
      data,
    });
  }

  async delete(
    where: Prisma.PelajaranWhereUniqueInput,
  ): Promise<Partial<Pelajaran>> {
    return this.prisma.pelajaran.delete({
      where,
    });
  }

  async findOne(id: number, userId: number, role: string): Promise<Pelajaran> {
    if (role === 'admin') {
      const pelajaran = await this.prisma.pelajaran.findUnique({
        where: { id },
      });

      if (!pelajaran) {
        throw new NotFoundException('Pelajaran tidak ditemukan.');
      }

      return pelajaran;
    }

    if (role === 'guru') {
      const pelajaran = await this.prisma.pelajaran.findUnique({
        where: {
          id,
          creatorId: userId,
        },
      });

      if (!pelajaran) {
        throw new ForbiddenException(
          'Anda tidak memiliki akses ke pelajaran ini.',
        );
      }

      return pelajaran;
    }

    throw new ForbiddenException('Peran tidak dikenali.');
  }

  async findMany(userId: bigint, role: string) {
    if (role === 'admin') {
      return this.prisma.pelajaran.findMany({
        include: {
          materi: true,
        },
      });
    }

    if (role === 'guru') {
      return this.prisma.pelajaran.findMany({
        where: {
          creatorId: userId,
        },
        include: {
          materi: true,
        },
      });
    }

    throw new ForbiddenException('Peran tidak dikenali.');
  }

  async findOneFilteredWithSelect({
    where,
    select,
  }: {
    where: Prisma.PelajaranWhereInput;
    select: Prisma.PelajaranSelect;
  }): Promise<Partial<Pelajaran> | null> {
    return this.prisma.pelajaran.findFirst({
      where,
      select,
    });
  }

  async findManyFilteredWithSelect({
    where,
    select,
  }: {
    where?: Prisma.PelajaranWhereInput;
    select: Prisma.PelajaranSelect;
  }): Promise<Partial<Pelajaran>[]> {
    return this.prisma.pelajaran.findMany({
      where,
      select,
    });
  }

  async findOneFilteredWithInclude({
    where,
    include,
  }: {
    where: Prisma.PelajaranWhereUniqueInput;
    include: Prisma.PelajaranInclude;
  }): Promise<Partial<Pelajaran> | null> {
    return this.prisma.pelajaran.findUnique({
      where,
      include,

    });
  }

  async findManyFilteredWithInclude({
    where,
    include,
  }: {
    where?: Prisma.PelajaranWhereInput;
    include: Prisma.PelajaranInclude;
  }): Promise<Partial<Pelajaran>[]> {
    return this.prisma.pelajaran.findMany({
      where,
      include,
    });
  }

  async findManyBySekolahAndJenjang({
    where,
  }: {
    where?: Prisma.PelajaranWhereInput;
  }): Promise<Partial<Pelajaran>[]> {
    return this.prisma.pelajaran.findMany({
      where,
    });
  }
}
