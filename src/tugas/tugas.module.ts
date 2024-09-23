import { Global, Module } from '@nestjs/common';
import { TugasService } from 'src/tugas/tugas.service';
import { TugasController } from 'src/tugas/tugas.controller';

@Global()
@Module({
  controllers: [TugasController],
  providers: [TugasService],
  exports: [TugasService],
})
export class TugasModule {}
