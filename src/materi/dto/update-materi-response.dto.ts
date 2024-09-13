import { ApiProperty } from '@nestjs/swagger';

export class MateriWithoutTugasDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  pelajaranId: number;

  @ApiProperty({ example: 2 })
  creatorId: number;

  @ApiProperty({ example: 'Materi A Pelajaran A Kelas 1A' })
  nama_materi: string;

  @ApiProperty({ example: null })
  file: string | null;

  @ApiProperty({ example: null })
  file_url: string | null;

  @ApiProperty({ example: null })
  yt_link: string | null;

  @ApiProperty({ example: null })
  file_link: string | null;

  @ApiProperty({ example: '2024-08-23T10:07:30.922Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-08-23T10:07:30.922Z' })
  updatedAt: string;
}

export class UpdateMateriResponseDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ example: 'Berhasil memperbarui materi' })
  message: string;

  @ApiProperty({
    description: 'Materi yang diperbarui tanpa tugas',
    type: MateriWithoutTugasDto,
  })
  materi: MateriWithoutTugasDto;
}
