import { PrismaClient } from '@prisma/client';
import { User } from 'src/user/entities/user.entity';
import { GuruData } from 'src/common/types/user.types';

export const PrismaExtensions = new PrismaClient().$extends({
  model: {
    user: {
      async getAllGuru(): Promise<GuruData[]> {
        const guru = await new PrismaClient().user.findMany({
          where: {
            roleId: 2,
            isActive: true,
          },
          select: {
            id: true,
            nama_lengkap: true,
            username: true,
            email: true,
            roleId: true,
            asal_sekolah: true,
            isActive: true,
            role: {
              select: {
                id: true,
                role: true,
              },
            },
            createdAt: true,
            updatedAt: true,
          },
        });
        return guru;
      },
      async getAllSiswa(): Promise<Partial<User>[]> {
        const siswa = await new PrismaClient().user.findMany({
          where: {
            roleId: 3,
            isActive: true,
          },
          select: {
            id: true,
            nama_lengkap: true,
            username: true,
            email: true,
            roleId: true,
            isActive: true,
            role: {
              select: {
                id: true,
                role: true,
              },
            },
            materi: {
              select: {
                materi: {
                  select: {
                    nama_materi: true,
                    tugas: {
                      select: {
                        nama_tugas: true,
                        pengumpulan: {
                          select: {
                            isi_pengumpulan: true,
                            // file: true,
                            // file_url: true,
                            nilai: {
                              select: {
                                nilai: true,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            createdAt: true,
            updatedAt: true,
          },
        });
        return siswa;
      },
    },
  },
});
