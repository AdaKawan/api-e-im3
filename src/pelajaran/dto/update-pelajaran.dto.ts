import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdatePelajaranDto {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  readonly kelasId: number;

  @IsString()
  @IsNotEmpty()
  readonly nama_pelajaran: string;
}
