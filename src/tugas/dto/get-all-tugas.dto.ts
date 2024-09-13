import { ApiProperty } from '@nestjs/swagger';
import { Tugas } from '../entities/tugas.entity';

export class FindAllTugasResponseDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ example: 'Berhasil mengambil semua tugas' })
  message: string;

  @ApiProperty({ type: [Tugas] })
  tugas: Tugas[];
}
