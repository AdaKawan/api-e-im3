import { Test, TestingModule } from '@nestjs/testing';
import { PelajaranController } from './pelajaran.controller';
import { PelajaranService } from './pelajaran.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';

describe('PelajaranController', () => {
  let controller: PelajaranController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PelajaranController],
      providers: [
        PelajaranService,
        PrismaService,
        ConfigService,
        RefreshTokenService,
        JwtService,
      ],
    }).compile();

    controller = module.get<PelajaranController>(PelajaranController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
