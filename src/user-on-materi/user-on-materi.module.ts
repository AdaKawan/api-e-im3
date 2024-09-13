import { Global, Module } from '@nestjs/common';
import { UserOnMateriService } from './user-on-materi.service';
import { UserOnMateriController } from './user-on-materi.controller';

@Global()
@Module({
  controllers: [UserOnMateriController],
  providers: [UserOnMateriService],
  exports: [UserOnMateriService],
})
export class UserOnMateriModule {}
