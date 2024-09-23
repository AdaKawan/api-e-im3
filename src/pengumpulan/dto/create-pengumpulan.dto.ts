import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class CreatePengumpulanDto {
  @ApiProperty({
    description: 'ID tugas yang terkait dengan pengumpulan',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  tugasId: number;

  @ApiProperty({
    description: 'Isi pengumpulan dalam format JSON',
    example: [
      {
        id: 5,
        answer: 'H2O',
      },
      {
        id: 6,
        answer: 'Canberra',
      },
    ],
  })
  @IsNotEmpty()
  @IsArray()
  isi_pengumpulan: object[];
}
