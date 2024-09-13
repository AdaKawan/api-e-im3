import { ApiProperty } from '@nestjs/swagger';
import { Kelas, Materi } from '@prisma/client';

export class CreatePelajaranResponseDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ example: 'Berhasil menambah pelajaran' })
  message: string;

  @ApiProperty({
    description: 'Pelajaran yang baru dibuat',
    type: Object,
    example: {
      id: 1,
      nama_pelajaran: 'Pelajaran A',
      kelas: 'Kelas 1A',
      materi: [], // Assuming materi is an array
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })
  pelajaran: Partial<{
    id: number;
    nama_pelajaran: string;
    kelas: Kelas;
    materi: Materi[]; // Adjust this type according to the actual type
    createdAt: Date;
    updatedAt: Date;
  }>;
}
