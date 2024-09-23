import { Global, Module } from '@nestjs/common';
import { PengumpulanService } from 'src/pengumpulan/pengumpulan.service';
import { PengumpulanController } from 'src/pengumpulan/pengumpulan.controller';

@Global()
@Module({
  controllers: [PengumpulanController],
  providers: [PengumpulanService],
  exports: [PengumpulanService],
})
export class PengumpulanModule {}
