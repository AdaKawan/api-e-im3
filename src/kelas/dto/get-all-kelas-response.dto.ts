import { ApiProperty } from '@nestjs/swagger';

export class KelasDto {
  @ApiProperty({ example: 12312 })
  id: number;

  @ApiProperty({ example: 'Matematika' })
  nama_kelas: string;
}

export class FindAllKelasResponseDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ example: 'Berhasil mengambil data' })
  message: string;

  @ApiProperty({
    type: [KelasDto],
    description: 'List of Kelas',
  })
  kelas: KelasDto[];
}
