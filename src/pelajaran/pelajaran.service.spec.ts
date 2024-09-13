import { Test, TestingModule } from '@nestjs/testing';
import { PelajaranService } from './pelajaran.service';

describe('PelajaranService', () => {
  let service: PelajaranService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PelajaranService],
    }).compile();

    service = module.get<PelajaranService>(PelajaranService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
