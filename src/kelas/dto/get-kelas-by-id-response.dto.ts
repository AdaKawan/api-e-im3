import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'John Doe' })
  nama_lengkap: string;
}

export class PelajaranDto {
  @ApiProperty({ example: 'Matematika' })
  nama_pelajaran: string;
}

export class KelasDetailDto {
  @ApiProperty({ example: 1231231 })
  id: number;

  @ApiProperty({ example: 'Matematika' })
  nama_kelas: string;

  @ApiProperty({ type: [UserDto] })
  users: UserDto[];

  @ApiProperty({ type: [PelajaranDto] })
  pelajaran: PelajaranDto[];
}

export class FindOneKelasResponseDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ example: 'Berhasil menemukan kelas' })
  message: string;

  @ApiProperty({
    type: KelasDetailDto,
    description: 'Detail kelas yang ditemukan',
  })
  kelas: KelasDetailDto;
}
