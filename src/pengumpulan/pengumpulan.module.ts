import { Global, Module } from '@nestjs/common';
import { PengumpulanService } from './pengumpulan.service';
import { PengumpulanController } from './pengumpulan.controller';

@Global()
@Module({
  controllers: [PengumpulanController],
  providers: [PengumpulanService],
  exports: [PengumpulanService],
})
export class PengumpulanModule {}
