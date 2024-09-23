import { Global, Module } from '@nestjs/common';
import { NilaiService } from 'src/nilai/nilai.service';
import { NilaiController } from 'src/nilai/nilai.controller';

@Global()
@Module({
  controllers: [NilaiController],
  providers: [NilaiService],
  exports: [NilaiService],
})
export class NilaiModule {}
