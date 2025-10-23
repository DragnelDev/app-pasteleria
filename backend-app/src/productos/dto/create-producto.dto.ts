import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateProductoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number) // Asegura la conversión a número
  precio: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  stockActual: number;

  @IsBoolean()
  requierePersonalizacion: boolean;

  @IsNotEmpty()
  @IsInt()
  idCategoria: number;
}
