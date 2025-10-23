import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateDetallePedidoDto } from 'src/detalle-pedidos/dto/create-detalle-pedido.dto';
export class CreatePedidoDto {
  @IsNotEmpty()
  @IsInt()
  idUsuario: number; // El ID del usuario logueado

  @IsNotEmpty()
  @IsInt()
  idDireccion: number;

  @IsNotEmpty()
  @IsInt()
  idMetodoPago: number;

  @IsNotEmpty()
  @IsString()
  tipoEntrega: string;

  @IsNumber()
  @Type(() => Number)
  costoEnvio: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDetallePedidoDto)
  detalles: CreateDetallePedidoDto[];
}
