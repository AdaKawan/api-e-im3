import { ApiProperty } from '@nestjs/swagger';
import { PengumpulanDto } from 'src/nilai/dto/find-all-nilai-response.dto';

export class FindOneNilaiResponseDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ example: 'Berhasil menemukan nilai' })
  message: string;

  @ApiProperty({
    description: 'Nilai yang ditemukan',
    type: Object,
    example: {
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
  })
  nilai: Partial<{
    id: number;
    pengumpulanId: number;
    nilai: number;
    createdAt: Date;
    updatedAt: Date;
    pengumpulan: PengumpulanDto;
  }>;
}
