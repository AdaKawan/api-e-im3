import { Test, TestingModule } from '@nestjs/testing';
import { NilaiService } from './nilai.service';

describe('NilaiService', () => {
  let service: NilaiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NilaiService],
    }).compile();

    service = module.get<NilaiService>(NilaiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
