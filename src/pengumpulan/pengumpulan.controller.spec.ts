import { Test, TestingModule } from '@nestjs/testing';
import { PengumpulanController } from './pengumpulan.controller';
import { PengumpulanService } from './pengumpulan.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';

describe('PengumpulanController', () => {
  let controller: PengumpulanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PengumpulanController],
      providers: [
        PengumpulanService,
        PrismaService,
        ConfigService,
        RefreshTokenService,
        JwtService,
      ],
    }).compile();

    controller = module.get<PengumpulanController>(PengumpulanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
