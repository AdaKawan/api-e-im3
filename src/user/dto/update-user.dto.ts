import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @ApiProperty({ required: true })
  nama_lengkap: string;

  @IsOptional()
  @ApiProperty({ required: false })
  email?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ required: true })
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ required: true })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ required: true })
  confPassword: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  asal_sekolah?: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  isActive: boolean;
}
