import { ApiProperty } from '@nestjs/swagger';
import { MateriDto } from 'src/materi/dto/materi.dto';

export class FindAllMateriResponseDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ example: 'Berhasil mengambil semua materi' })
  message: string;

  @ApiProperty({
    type: [MateriDto],
    description: 'List of Materi',
    example: [
      {
        id: 1,
        pelajaranId: 1,
        creatorId: 2,
        nama_materi: 'Materi A Pelajaran A Kelas 1A',
        file: null,
        file_url: null,
        yt_link: null,
        file_link: null,
        createdAt: '2024-08-23T10:07:30.922Z',
        updatedAt: '2024-08-23T10:07:30.922Z',
        tugas: [
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
      },
      // Include other Materi items here
    ],
  })
  materi: MateriDto[];
}
