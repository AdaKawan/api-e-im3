import { ApiProperty } from '@nestjs/swagger';
import { KelasDto } from 'src/kelas/dto/get-all-kelas-response.dto';
import { MateriDto } from 'src/materi/dto/materi.dto';

export class PelajaranDto {
  @ApiProperty({ example: 1 })
  id: number; // Mengubah bigint menjadi number

  @ApiProperty({ example: 'Pelajaran A' })
  nama_pelajaran: string;

  @ApiProperty({ type: KelasDto })
  kelas: KelasDto;

  @ApiProperty({ type: [MateriDto] })
  materi: MateriDto[];

  @ApiProperty({ example: '2024-08-23T10:07:30.922Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-08-23T10:07:30.922Z' })
  updatedAt: Date;
}
