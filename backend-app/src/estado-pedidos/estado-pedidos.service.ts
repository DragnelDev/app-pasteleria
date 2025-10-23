import { Injectable } from '@nestjs/common';
import { CreateEstadoPedidoDto } from './dto/create-estado-pedido.dto';
import { UpdateEstadoPedidoDto } from './dto/update-estado-pedido.dto';

@Injectable()
export class EstadoPedidosService {
  create(createEstadoPedidoDto: CreateEstadoPedidoDto) {
    return 'This action adds a new estadoPedido';
  }

  findAll() {
    return `This action returns all estadoPedidos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estadoPedido`;
  }

  update(id: number, updateEstadoPedidoDto: UpdateEstadoPedidoDto) {
    return `This action updates a #${id} estadoPedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadoPedido`;
  }
}
