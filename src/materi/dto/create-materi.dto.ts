import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMateriDto {
  @ApiProperty({
    description: 'ID pelajaran yang terkait dengan materi',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  pelajaranId: number;

  @ApiProperty({ description: 'Nama materi', example: 'Materi Matematika' })
  @IsNotEmpty()
  @IsString()
  nama_materi: string;

  @ApiProperty({ description: 'Isi materi', example: 'Konten materi' })
  @IsNotEmpty()
  @IsString()
  isi_materi: string;
}
