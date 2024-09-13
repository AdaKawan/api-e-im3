import { ApiProperty } from '@nestjs/swagger';

export class UpdateNilaiResponseDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ example: 'Berhasil memperbarui nilai' })
  message: string;

  @ApiProperty({
    description: 'Nilai yang diperbarui',
    type: Object,
    example: {
      id: 1,
      pengumpulanId: 1,
      nilai: 85,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })
  nilai: Partial<{
    id: number;
    pengumpulanId: number;
    nilai: number;
    createdAt: Date;
    updatedAt: Date;
  }>;
}
