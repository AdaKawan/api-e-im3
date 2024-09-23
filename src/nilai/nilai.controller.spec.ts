import { Test, TestingModule } from '@nestjs/testing';
import { NilaiController } from './nilai.controller';
import { NilaiService } from './nilai.service';
import { PengumpulanService } from 'src/pengumpulan/pengumpulan.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { ConfigService } from '@nestjs/config';

describe('NilaiController', () => {
  let controller: NilaiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NilaiController],
      providers: [
        NilaiService,
        PengumpulanService,
        PrismaService,
        JwtService,
        RefreshTokenService,
        ConfigService,
      ],
    }).compile();

    controller = module.get<NilaiController>(NilaiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
