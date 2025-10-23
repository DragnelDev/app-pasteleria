import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDetallePedidoDto {
  // ⭐ Campo faltante para referenciar el pedido
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  idPedido: number; // AÑADIDO

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  idProducto: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  cantidad: number;

  // ⭐ Campo opcional, si no se envía, se toma del producto
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  precioUnitarioFinal?: number; // Ahora es opcional
}
