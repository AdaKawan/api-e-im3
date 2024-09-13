import { Test, TestingModule } from '@nestjs/testing';
import { UserOnKelasController } from './user-on-kelas.controller';
import { UserOnKelasService } from './user-on-kelas.service';

describe('UserOnKelasController', () => {
  let controller: UserOnKelasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserOnKelasController],
      providers: [UserOnKelasService],
    }).compile();

    controller = module.get<UserOnKelasController>(UserOnKelasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
