import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AutoLoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  refresh_token: string;
}
