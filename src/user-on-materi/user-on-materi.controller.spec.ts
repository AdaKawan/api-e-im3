import { Test, TestingModule } from '@nestjs/testing';
import { UserOnMateriController } from './user-on-materi.controller';
import { UserOnMateriService } from './user-on-materi.service';

describe('UserOnMateriController', () => {
  let controller: UserOnMateriController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserOnMateriController],
      providers: [UserOnMateriService],
    }).compile();

    controller = module.get<UserOnMateriController>(UserOnMateriController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
