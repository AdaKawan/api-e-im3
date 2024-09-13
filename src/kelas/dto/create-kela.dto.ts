import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateKelaDto {
  @IsString()
  @MinLength(3)
  @ApiProperty({ required: true })
  nama_kelas: string;
}
