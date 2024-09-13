import { Global, Module } from '@nestjs/common';
import { MateriService } from './materi.service';
import { MateriController } from './materi.controller';

@Global()
@Module({
  controllers: [MateriController],
  providers: [MateriService],
  exports: [MateriService],
})
export class MateriModule {}
