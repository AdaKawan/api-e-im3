import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateIsActiveDto {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  isActive: boolean;
}
