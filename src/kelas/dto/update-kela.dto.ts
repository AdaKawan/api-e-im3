import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdateKelaDto {
  @IsString()
  @MinLength(3)
  @ApiProperty({ required: true })
  nama_kelas: string;
}
