import { Global, Module } from '@nestjs/common';
import { PelajaranService } from './pelajaran.service';
import { PelajaranController } from './pelajaran.controller';

@Global()
@Module({
  controllers: [PelajaranController],
  providers: [PelajaranService],
  exports: [PelajaranService],
})
export class PelajaranModule {}
