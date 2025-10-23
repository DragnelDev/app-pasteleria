import { Test, TestingModule } from '@nestjs/testing';
import { EstadoPedidosService } from './estado-pedidos.service';

describe('EstadoPedidosService', () => {
  let service: EstadoPedidosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstadoPedidosService],
    }).compile();

    service = module.get<EstadoPedidosService>(EstadoPedidosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
