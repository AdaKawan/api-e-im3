import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePelajaranDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  readonly jenjang_kelas: number;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsString()
  asal_sekolah: string;

  @ApiProperty({ example: 'Pelajaran A' })
  @IsString()
  @IsNotEmpty()
  readonly nama_pelajaran: string;
}
