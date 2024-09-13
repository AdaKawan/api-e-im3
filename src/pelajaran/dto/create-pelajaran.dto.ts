import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePelajaranDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  readonly kelasId: number;

  @ApiProperty({ example: 'Pelajaran A' })
  @IsString()
  @IsNotEmpty()
  readonly nama_pelajaran: string;
}
