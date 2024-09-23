import { Global, Module } from '@nestjs/common';
import { UserOnMateriService } from 'src/user-on-materi/user-on-materi.service';
import { UserOnMateriController } from 'src/user-on-materi/user-on-materi.controller';

@Global()
@Module({
  controllers: [UserOnMateriController],
  providers: [UserOnMateriService],
  exports: [UserOnMateriService],
})
export class UserOnMateriModule {}
