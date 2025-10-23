import { Test, TestingModule } from '@nestjs/testing';
import { EstadoPedidosController } from './estado-pedidos.controller';
import { EstadoPedidosService } from './estado-pedidos.service';

describe('EstadoPedidosController', () => {
  let controller: EstadoPedidosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadoPedidosController],
      providers: [EstadoPedidosService],
    }).compile();

    controller = module.get<EstadoPedidosController>(EstadoPedidosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
