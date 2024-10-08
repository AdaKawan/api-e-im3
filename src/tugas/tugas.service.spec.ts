import { Test, TestingModule } from '@nestjs/testing';
import { TugasService } from './tugas.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('TugasService', () => {
  let service: TugasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TugasService, PrismaService],
    }).compile();

    service = module.get<TugasService>(TugasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
