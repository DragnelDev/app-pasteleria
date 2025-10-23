import { Test, TestingModule } from '@nestjs/testing';
import { MetodoPagosService } from './metodo-pagos.service';

describe('MetodoPagosService', () => {
  let service: MetodoPagosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetodoPagosService],
    }).compile();

    service = module.get<MetodoPagosService>(MetodoPagosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
