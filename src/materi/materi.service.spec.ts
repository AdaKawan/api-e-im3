import { Test, TestingModule } from '@nestjs/testing';
import { MateriService } from './materi.service';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('MateriService', () => {
  let service: MateriService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [MateriService],
    }).compile();

    service = module.get<MateriService>(MateriService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
