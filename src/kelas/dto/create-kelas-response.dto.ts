import { ApiProperty } from '@nestjs/swagger';

export class CreateKelasResponseDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ example: 'Berhasil menambah data' })
  message: string;

  @ApiProperty({
    description: 'Kelas yang baru dibuat',
    type: Object,
    example: {
      id: 1231231,
      nama_kelas: 'Matematika',
    },
  })
  kelas: {
    id: number;
    nama_kelas: string;
  };
}
