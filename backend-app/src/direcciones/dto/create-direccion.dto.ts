import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateDireccionDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo idCliente estar definido' })
  @IsInt({ message: 'El campo idCliente debe ser numérico' })
  idCliente: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo calle no debe estar vacío' })
  @IsString({ message: 'El campo calle debe ser de tipo cadena' })
  @MaxLength(200, {
    message: 'El campo calle no debe exceder los 200 caracteres',
  })
  @Transform(({ value }): string | undefined =>
    typeof value === 'string' ? value.trim() : value,
  )
  calle: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo numero no debe estar vacío' })
  @IsString({ message: 'El campo numero debe ser de tipo cadena' })
  @MaxLength(10, {
    message: 'El campo numero no debe exceder los 10 caracteres',
  })
  numero: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo ciudad no debe estar vacío' })
  @IsString({ message: 'El campo ciudad debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo ciudad no debe exceder los 100 caracteres',
  })
  @Transform(({ value }): string | undefined =>
    typeof value === 'string' ? value.trim() : value,
  )
  ciudad: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo codigoPostal no debe estar vacío' })
  @IsString({ message: 'El campo codigoPostal debe ser de tipo cadena' })
  @MaxLength(10, {
    message: 'El campo codigoPostal no debe exceder los 150 caracteres',
  })
  codigoPostal: string;

  @ApiProperty()
  @IsBoolean({ message: 'El campo esPrincipal debe ser un valor booleano' })
  @Transform(({ value }): boolean => Boolean(value))
  @IsDefined({ message: 'El campo esPrincipal debe estar definido' })
  esPrincipal: boolean;
}
