import { Test, TestingModule } from '@nestjs/testing';
import { NilaiService } from './nilai.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('NilaiService', () => {
  let service: NilaiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NilaiService, PrismaService],
    }).compile();

    service = module.get<NilaiService>(NilaiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
