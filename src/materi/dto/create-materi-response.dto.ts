import { ApiProperty } from '@nestjs/swagger';

export class CreateMateriResponseDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ example: 'Berhasil menambah materi' })
  message: string;

  @ApiProperty({
    description: 'Materi yang baru dibuat',
    type: Object, // Ganti dengan DTO materi yang sesuai jika ada
    example: {
      id: 1,
      pelajaranId: 2,
      creatorId: 3,
      nama_materi: 'Materi Matematika',
      file: 'unique-file-name.pdf',
      file_url: 'https://example.com/path/to/file.pdf',
      yt_link: 'https://youtube.com/link',
      file_link: 'https://example.com/file',
      createdAt: '2024-08-25T00:00:00.000Z',
      updatedAt: '2024-08-25T00:00:00.000Z',
    },
  })
  materi: {
    id: number;
    pelajaranId: number;
    creatorId: number;
    nama_materi: string;
    file: string | null;
    file_url: string | null;
    yt_link: string | null;
    file_link: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
}
