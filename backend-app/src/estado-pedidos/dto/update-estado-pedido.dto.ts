import { PartialType } from '@nestjs/swagger';
import { CreateEstadoPedidoDto } from './create-estado-pedido.dto';

export class UpdateEstadoPedidoDto extends PartialType(CreateEstadoPedidoDto) {}
