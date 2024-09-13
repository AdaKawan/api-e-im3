import { ApiProperty } from '@nestjs/swagger';

export class DeleteNilaiResponseDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ example: 'Berhasil menghapus nilai' })
  message: string;
}
