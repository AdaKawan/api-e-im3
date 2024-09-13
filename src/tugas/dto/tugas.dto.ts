import { ApiProperty } from '@nestjs/swagger';

export class TugasDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  materiId: number;

  @ApiProperty({ example: 2 })
  creatorId: number;

  @ApiProperty({ example: 'Tugas 1 - Materi A Pelajaran A Kelas 1A' })
  nama_tugas: string;

  @ApiProperty({ example: null })
  file: string | null;

  @ApiProperty({ example: null })
  file_url: string | null;

  @ApiProperty({ example: '2024-08-30T23:59:59.999Z' })
  deadline: Date;

  @ApiProperty({ example: '2024-08-23T10:07:33.398Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-08-23T10:07:33.398Z' })
  updatedAt: Date;
}
