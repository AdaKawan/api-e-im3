import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  password: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  rememberMe: boolean;
}
