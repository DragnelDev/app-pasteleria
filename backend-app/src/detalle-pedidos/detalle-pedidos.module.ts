import { Module } from '@nestjs/common';
import { DetallePedidosService } from './detalle-pedidos.service';
import { DetallePedidosController } from './detalle-pedidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallePedido } from './entities/detalle-pedido.entity';
import { ProductosModule } from 'src/productos/productos.module';
import { PedidosModule } from 'src/pedidos/pedidos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetallePedido]),
    ProductosModule,
    PedidosModule,
  ],
  controllers: [DetallePedidosController],
  providers: [DetallePedidosService],
  exports: [DetallePedidosService, TypeOrmModule.forFeature([DetallePedido])],
})
export class DetallePedidosModule {}
