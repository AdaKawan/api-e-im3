import { Global, Module } from '@nestjs/common';
import { MateriService } from 'src/materi/materi.service';
import { MateriController } from 'src/materi/materi.controller';

@Global()
@Module({
  controllers: [MateriController],
  providers: [MateriService],
  exports: [MateriService],
})
export class MateriModule {}
