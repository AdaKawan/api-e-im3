import { Test, TestingModule } from '@nestjs/testing';
import { PelajaranController } from './pelajaran.controller';
import { PelajaranService } from './pelajaran.service';

describe('PelajaranController', () => {
  let controller: PelajaranController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PelajaranController],
      providers: [PelajaranService],
    }).compile();

    controller = module.get<PelajaranController>(PelajaranController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
