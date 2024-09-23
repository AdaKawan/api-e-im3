import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
  IsArray,
} from 'class-validator';

export class UpdateTugasDto {
  @ApiProperty({
    description: 'ID materi yang terkait dengan tugas',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  materiId: number;

  @ApiProperty({ description: 'Nama tugas', example: 'Tugas Matematika' })
  @IsNotEmpty()
  @IsString()
  nama_tugas: string;

  @ApiProperty({
    description: 'Isi tugas dalam format JSON',
    example: [
      {
        id: 5,
        title: 'Apa simbol kimia untuk air?',
        answer: 'H2O',
        points: 5,
        content: 'Apa simbol kimia untuk air?',
      },
      {
        id: 6,
        type: 'multiple-choice',
        title: 'Apa ibu kota dari Australia?',
        points: 10,
        content: 'Apa ibu kota dari Australia?',
        options: [
          { text: 'Sydney', isCorrect: false },
          { text: 'Melbourne', isCorrect: false },
          { text: 'Canberra', isCorrect: true },
          { text: 'Brisbane', isCorrect: false },
        ],
      },
    ],
  })
  @IsNotEmpty()
  @IsArray()
  isi_tugas: object[];

  @ApiProperty({
    description: 'Tanggal batas waktu tugas',
    example: '2024-12-31T23:59:59Z',
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  deadline: Date;
}
