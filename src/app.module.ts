import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { PelajaranModule } from './pelajaran/pelajaran.module';
import { MateriModule } from './materi/materi.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TugasModule } from './tugas/tugas.module';
import { PengumpulanModule } from './pengumpulan/pengumpulan.module';
import { NilaiModule } from './nilai/nilai.module';
import { UserOnMateriModule } from './user-on-materi/user-on-materi.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public/',
    }),
    PrismaModule,
    UserModule,
    PelajaranModule,
    MateriModule,
    TugasModule,
    PengumpulanModule,
    NilaiModule,
    UserOnMateriModule,
    RefreshTokenModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
