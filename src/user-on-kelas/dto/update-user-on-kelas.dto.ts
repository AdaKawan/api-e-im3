import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateUserOnKelasDto {
  @IsNumber()
  @ApiProperty({ required: true })
  oldUserId: number;

  @IsNumber()
  @ApiProperty({ required: true })
  oldKelasId: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  newUserId?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  newKelasId?: number;
}
