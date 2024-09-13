import { Global, Module } from '@nestjs/common';
import { NilaiService } from './nilai.service';
import { NilaiController } from './nilai.controller';

@Global()
@Module({
  controllers: [NilaiController],
  providers: [NilaiService],
  exports: [NilaiService],
})
export class NilaiModule {}
