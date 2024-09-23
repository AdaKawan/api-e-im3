import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { PelajaranModule } from 'src/pelajaran/pelajaran.module';
import { MateriModule } from 'src/materi/materi.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TugasModule } from 'src/tugas/tugas.module';
import { PengumpulanModule } from 'src/pengumpulan/pengumpulan.module';
import { NilaiModule } from 'src/nilai/nilai.module';
import { UserOnMateriModule } from 'src/user-on-materi/user-on-materi.module';
import { RefreshTokenModule } from 'src/refresh-token/refresh-token.module';
import { AuthModule } from 'src/auth/auth.module';
import configuration from 'src/common/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
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
export class AppModule {}
