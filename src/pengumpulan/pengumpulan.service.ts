import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreatePengumpulanDto } from 'src/pengumpulan/dto/create-pengumpulan.dto';
import { UpdatePengumpulanDto } from 'src/pengumpulan/dto/update-pengumpulan.dto';
import { Pengumpulan, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PengumpulanService {
  constructor(private prisma: PrismaService) {}

  async create(
    pengumpulId: number,
    data: CreatePengumpulanDto,
  ): Promise<Partial<Pengumpulan>> {
    // Cari tugas
    const tugas = await this.prisma.tugas.findUnique({
      where: { id: data.tugasId },
    });

    if (!tugas) {
      throw new ForbiddenException('Tugas tidak ditemukan.');
    }

    // Jika valid, buat pengumpulan
    return this.prisma.pengumpulan.create({
      data: {
        tugasId: data.tugasId,
        pengumpulId,
        isi_pengumpulan: data.isi_pengumpulan,
      },
    });
  }

  async update({
    where,
    data,
  }: {
    where: Prisma.PengumpulanWhereUniqueInput;
    data: UpdatePengumpulanDto;
  }): Promise<Partial<Pengumpulan>> {
    return this.prisma.pengumpulan.update({
      where,
      data,
    });
  }

  async delete(
    where: Prisma.PengumpulanWhereUniqueInput,
  ): Promise<Partial<Pengumpulan>> {
    return this.prisma.pengumpulan.delete({
      where,
    });
  }

  async findOne(id: number): Promise<Partial<Pengumpulan> | null> {
    return this.prisma.pengumpulan.findUnique({
      where: { id },
    });
  }

  async findMany(
    userId: bigint,
    role: string,
  ): Promise<Partial<Pengumpulan>[]> {
    if (role === 'admin') {
      return this.prisma.pengumpulan.findMany({
        select: {
          id: true,
          tugasId: true,
          pengumpulId: true,
          isi_pengumpulan: true,
          // file: true,
          // file_url: true,
          createdAt: true,
          updatedAt: true,
          tugas: true,
          pengumpul: {
            select: {
              nama_lengkap: true,
            },
          },
        },
      });
    }

    if (role === 'guru') {
      return this.prisma.pengumpulan.findMany({
        where: {
          tugas: {
            creatorId: userId,
          },
        },
        select: {
          id: true,
          tugasId: true,
          pengumpulId: true,
          isi_pengumpulan: true,
          // file: true,
          // file_url: true,
          createdAt: true,
          updatedAt: true,
          tugas: true,
          pengumpul: {
            select: {
              nama_lengkap: true,
            },
          },
        },
      });
    }

    if (role === 'siswa') {
      return this.prisma.pengumpulan.findMany({
        where: {
          pengumpulId: userId,
        },
        select: {
          id: true,
          tugasId: true,
          pengumpulId: true,
          // file: true,
          // file_url: true,
          isi_pengumpulan: true,
          createdAt: true,
          updatedAt: true,
          tugas: true,
          pengumpul: {
            select: {
              nama_lengkap: true,
            },
          },
        },
      });
    }

    throw new ForbiddenException('Peran tidak dikenali.');
  }

  async findOnewithAuthorization(
    userId: number,
    role: string,
    pengumpulanId: number,
  ): Promise<Partial<Pengumpulan> | null> {
    const pengumpulan = await this.prisma.pengumpulan.findFirst({
      where: {
        id: pengumpulanId,
      },
      select: {
        id: true,
        tugasId: true,
        pengumpulId: true,
        // file: true,
        // file_url: true,
        isi_pengumpulan: true,
        createdAt: true,
        updatedAt: true,
        tugas: {
          select: {
            creatorId: true,
          },
        },
        pengumpul: {
          select: {
            id: true,
            nama_lengkap: true,
          },
        },
        nilai: true,
      },
    });

    if (!pengumpulan) {
      throw new ForbiddenException('Pengumpulan tidak ditemukan.');
    }

    if (role === 'admin') {
      return pengumpulan;
    }

    if (role === 'guru') {
      if (Number(pengumpulan.tugas.creatorId) !== userId) {
        throw new ForbiddenException(
          'Anda tidak memiliki akses ke pengumpulan ini.',
        );
      }
      return pengumpulan;
    }

    if (role === 'siswa') {
      if (Number(pengumpulan.pengumpulId) !== userId) {
        throw new ForbiddenException(
          'Anda tidak memiliki akses ke pengumpulan ini.',
        );
      }
      return pengumpulan;
    }

    throw new ForbiddenException('Peran tidak dikenali.');
  }

  async findOneFilteredWithSelect({
    where,
    select,
  }: {
    where: Prisma.PengumpulanWhereUniqueInput;
    select: Prisma.PengumpulanSelect;
  }): Promise<Partial<Pengumpulan> | null> {
    return this.prisma.pengumpulan.findUnique({
      where,
      select,
    });
  }

  async findManyFilteredWithSelect({
    where,
    select,
  }: {
    where?: Prisma.PengumpulanWhereInput;
    select: Prisma.PengumpulanSelect;
  }): Promise<Partial<Pengumpulan>[]> {
    return this.prisma.pengumpulan.findMany({
      where,
      select,
    });
  }

  async findOneFilteredWithInclude({
    where,
    include,
  }: {
    where: Prisma.PengumpulanWhereUniqueInput;
    include: Prisma.PengumpulanInclude;
  }): Promise<Partial<Pengumpulan> | null> {
    return this.prisma.pengumpulan.findUnique({
      where,
      include,
    });
  }

  async findManyFilteredWithInclude({
    where,
    include,
  }: {
    where?: Prisma.PengumpulanWhereInput;
    include: Prisma.PengumpulanInclude;
  }): Promise<Partial<Pengumpulan>[]> {
    return this.prisma.pengumpulan.findMany({
      where,
      include,
    });
  }
}
