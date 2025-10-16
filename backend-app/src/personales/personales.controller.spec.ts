import { Test, TestingModule } from '@nestjs/testing';
import { PersonalesController } from './personales.controller';
import { PersonalesService } from './personales.service';

describe('PersonalesController', () => {
  let controller: PersonalesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonalesController],
      providers: [PersonalesService],
    }).compile();

    controller = module.get<PersonalesController>(PersonalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
