import { ApiProperty } from '@nestjs/swagger';

export class CreateNilaiResponseDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ example: 'Berhasil menambah nilai' })
  message: string;

  @ApiProperty({
    description: 'Nilai yang baru dibuat',
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
