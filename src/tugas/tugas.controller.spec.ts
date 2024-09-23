import { Test, TestingModule } from '@nestjs/testing';
import { TugasController } from './tugas.controller';
import { TugasService } from './tugas.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('TugasController', () => {
  let controller: TugasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TugasController],
      providers: [
        TugasService,
        PrismaService,
        JwtService,
        ConfigService,
        RefreshTokenService,
      ],
    }).compile();

    controller = module.get<TugasController>(TugasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
