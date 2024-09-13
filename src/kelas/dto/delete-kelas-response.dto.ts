import { ApiProperty } from '@nestjs/swagger';

export class DeleteKelasResponseDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ example: 'Berhasil menghapus kelas' })
  message: string;
}
