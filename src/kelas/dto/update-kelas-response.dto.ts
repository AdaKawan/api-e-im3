import { ApiProperty } from '@nestjs/swagger';

export class UpdateKelasResponseDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ example: 'Berhasil memperbarui kelas' })
  message: string;

  @ApiProperty({
    description: 'Kelas yang diperbarui',
    type: Object,
    example: {
      id: 12312,
      nama_kelas: 'Fisika',
    },
  })
  kelas: {
    id: number;
    nama_kelas: string;
  };
}
