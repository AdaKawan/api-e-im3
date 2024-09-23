import { Test, TestingModule } from '@nestjs/testing';
import { UserOnMateriController } from './user-on-materi.controller';
import { UserOnMateriService } from './user-on-materi.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';

describe('UserOnMateriController', () => {
  let controller: UserOnMateriController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserOnMateriController],
      providers: [
        UserOnMateriService,
        PrismaService,
        ConfigService,
        RefreshTokenService,
        JwtService,
      ],
    }).compile();

    controller = module.get<UserOnMateriController>(UserOnMateriController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
