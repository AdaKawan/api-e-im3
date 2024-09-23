import { Global, Module } from '@nestjs/common';
import { PelajaranService } from 'src/pelajaran/pelajaran.service';
import { PelajaranController } from 'src/pelajaran/pelajaran.controller';

@Global()
@Module({
  controllers: [PelajaranController],
  providers: [PelajaranService],
  exports: [PelajaranService],
})
export class PelajaranModule {}
