import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsNotEmpty, IsArray } from 'class-validator';

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

  // @ApiProperty({
  //   description: 'File materi',
  //   example: 'file.pdf',
  //   required: false,
  // })
  // @IsOptional()
  // @IsString()
  // file: string;

  @ApiProperty({
    description: 'File URL materi',
    example: 'https://example.com/public/file.pdf',
    required: false,
  })
  @IsOptional()
  @IsArray()
  file_url: string[];
}
