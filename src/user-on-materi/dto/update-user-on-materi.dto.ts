import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateUserOnMateriDto {
  @ApiProperty({
    description: 'ID pengguna yang terkait dengan materi',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  userId: number;

  @ApiProperty({
    description: 'ID materi yang terkait dengan pengguna',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  materiId: number;
}
