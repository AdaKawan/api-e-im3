import { ApiProperty } from '@nestjs/swagger';
import { TugasDto } from 'src/tugas/dto/tugas.dto';

export class MateriDto {
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
  createdAt: Date;

  @ApiProperty({ example: '2024-08-23T10:07:30.922Z' })
  updatedAt: Date;

  @ApiProperty({
    type: [TugasDto],
    description: 'List of Tugas associated with the Materi',
    example: [
      {
        id: 1,
        materiId: 1,
        creatorId: 2,
        nama_tugas: 'Tugas 1 - Materi A Pelajaran A Kelas 1A',
        file: null,
        file_url: null,
        deadline: '2024-08-30T23:59:59.999Z',
        createdAt: '2024-08-23T10:07:33.398Z',
        updatedAt: '2024-08-23T10:07:33.398Z',
      },
    ],
  })
  tugas: TugasDto[];
}
