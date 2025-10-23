import { Test, TestingModule } from '@nestjs/testing';
import { MetodoPagosController } from './metodo-pagos.controller';
import { MetodoPagosService } from './metodo-pagos.service';

describe('MetodoPagosController', () => {
  let controller: MetodoPagosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetodoPagosController],
      providers: [MetodoPagosService],
    }).compile();

    controller = module.get<MetodoPagosController>(MetodoPagosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
