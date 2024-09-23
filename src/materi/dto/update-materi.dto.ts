import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateMateriDto {
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
