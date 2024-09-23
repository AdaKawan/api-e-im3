import { Test, TestingModule } from '@nestjs/testing';
import { UserOnMateriService } from './user-on-materi.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('UserOnMateriService', () => {
  let service: UserOnMateriService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserOnMateriService, PrismaService],
    }).compile();

    service = module.get<UserOnMateriService>(UserOnMateriService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
