import { Test, TestingModule } from '@nestjs/testing';
import { PengumpulanController } from './pengumpulan.controller';
import { PengumpulanService } from './pengumpulan.service';

describe('PengumpulanController', () => {
  let controller: PengumpulanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PengumpulanController],
      providers: [PengumpulanService],
    }).compile();

    controller = module.get<PengumpulanController>(PengumpulanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
