import { Test, TestingModule } from '@nestjs/testing';
import { PersonalesService } from './personales.service';

describe('PersonalesService', () => {
  let service: PersonalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonalesService],
    }).compile();

    service = module.get<PersonalesService>(PersonalesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
