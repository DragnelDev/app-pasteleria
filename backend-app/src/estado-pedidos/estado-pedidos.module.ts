import { Module } from '@nestjs/common';
import { EstadoPedidosService } from './estado-pedidos.service';
import { EstadoPedidosController } from './estado-pedidos.controller';
import { EstadoPedido } from './entities/estado-pedido.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoPedido])],
  controllers: [EstadoPedidosController],
  providers: [EstadoPedidosService],
  exports: [EstadoPedidosService, TypeOrmModule],
})
export class EstadoPedidosModule {}
