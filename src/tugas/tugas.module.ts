import { Global, Module } from '@nestjs/common';
import { TugasService } from './tugas.service';
import { TugasController } from './tugas.controller';

@Global()
@Module({
  controllers: [TugasController],
  providers: [TugasService],
  exports: [TugasService],
})
export class TugasModule {}
