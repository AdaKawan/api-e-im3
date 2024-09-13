import { ApiProperty } from '@nestjs/swagger';

export class PengumpulanDto {
  @ApiProperty({ example: 1 })
  tugasId: number;

  @ApiProperty({
    description: 'Pengumpul dari nilai',
    type: Object,
    example: {
      id: 1,
      nama_lengkap: 'John Doe',
    },
  })
  pengumpul: {
    id: number;
    nama_lengkap: string;
  };

  @ApiProperty({
    description: 'Tugas terkait dari nilai',
    type: Object,
    example: {
      nama_tugas: 'Tugas 1 - Materi A Pelajaran A Kelas 1A',
      materiId: 1,
      materi: {
        nama_materi: 'Materi A Pelajaran A Kelas 1A',
      },
    },
  })
  tugas: {
    nama_tugas: string;
    materiId: number;
    materi: {
      nama_materi: string;
    };
  };
}

export class FindAllNilaiResponseDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ example: 'Berhasil mengambil semua nilai' })
  message: string;

  @ApiProperty({
    description: 'Daftar nilai dengan relasi tambahan',
    type: [Object],
    example: [
      {
        id: 1,
        pengumpulanId: 1,
        nilai: 85,
        createdAt: new Date(),
        updatedAt: new Date(),
        pengumpulan: {
          tugasId: 1,
          pengumpul: {
            id: 1,
            nama_lengkap: 'John Doe',
          },
          tugas: {
            nama_tugas: 'Tugas 1 - Materi A Pelajaran A Kelas 1A',
            materiId: 1,
            materi: {
              nama_materi: 'Materi A Pelajaran A Kelas 1A',
            },
          },
        },
      },
    ],
  })
  nilai: Array<
    Partial<{
      id: number;
      pengumpulanId: number;
      nilai: number;
      createdAt: Date;
      updatedAt: Date;
      pengumpulan: PengumpulanDto;
    }>
  >;
}
