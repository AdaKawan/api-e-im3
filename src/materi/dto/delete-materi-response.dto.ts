import { ApiProperty } from '@nestjs/swagger';

export class DeleteMateriResponseDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ example: 'Berhasil menghapus materi' })
  message: string;
}
