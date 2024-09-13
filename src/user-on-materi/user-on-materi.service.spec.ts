import { Test, TestingModule } from '@nestjs/testing';
import { UserOnMateriService } from './user-on-materi.service';

describe('UserOnMateriService', () => {
  let service: UserOnMateriService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserOnMateriService],
    }).compile();

    service = module.get<UserOnMateriService>(UserOnMateriService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
