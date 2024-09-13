import { Global, Module } from '@nestjs/common';
import { UserOnKelasService } from './user-on-kelas.service';
import { UserOnKelasController } from './user-on-kelas.controller';

@Global()
@Module({
  controllers: [UserOnKelasController],
  providers: [UserOnKelasService],
  exports: [UserOnKelasService],
})
export class UserOnKelasModule {}
