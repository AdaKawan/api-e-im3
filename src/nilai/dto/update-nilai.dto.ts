import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class UpdateNilaiDto {
  @ApiProperty({
    description: 'ID Pengumpulan yang terkait dengan nilai',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  pengumpulanId: number;

  @ApiProperty({ description: 'Nilai yang diberikan', example: 85 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  nilai: number;
}
