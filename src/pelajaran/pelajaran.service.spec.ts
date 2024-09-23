import { Test, TestingModule } from '@nestjs/testing';
import { PelajaranService } from './pelajaran.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('PelajaranService', () => {
  let service: PelajaranService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PelajaranService, PrismaService],
    }).compile();

    service = module.get<PelajaranService>(PelajaranService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
