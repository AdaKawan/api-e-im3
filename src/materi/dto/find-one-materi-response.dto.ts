import { ApiProperty } from '@nestjs/swagger';
import { MateriDto } from 'src/materi/dto/materi.dto';

export class FindOneMateriResponseDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ example: 'Berhasil menemukan materi' })
  message: string;

  @ApiProperty({ type: MateriDto })
  materi: MateriDto;
}
