import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateUserOnKelaDto {
  @IsNumber()
  @ApiProperty({ required: true })
  userId: number;

  @IsNumber()
  @ApiProperty({ required: true })
  kelasId: number;
}
