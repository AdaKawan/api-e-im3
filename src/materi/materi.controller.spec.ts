import { Test, TestingModule } from '@nestjs/testing';
import { MateriController } from './materi.controller';
import { MateriService } from './materi.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { ConfigService } from '@nestjs/config';
import { PelajaranService } from 'src/pelajaran/pelajaran.service';

describe('MateriController', () => {
  let controller: MateriController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MateriController],
      providers: [
        MateriService,
        PrismaService,
        RefreshTokenService,
        ConfigService,
        JwtService,
        PelajaranService,
      ],
    }).compile();

    controller = module.get<MateriController>(MateriController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
