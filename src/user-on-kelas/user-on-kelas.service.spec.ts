import { Test, TestingModule } from '@nestjs/testing';
import { UserOnKelasService } from './user-on-kelas.service';

describe('UserOnKelasService', () => {
  let service: UserOnKelasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserOnKelasService],
    }).compile();

    service = module.get<UserOnKelasService>(UserOnKelasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
