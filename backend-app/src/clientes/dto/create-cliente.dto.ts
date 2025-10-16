import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateClienteDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo idUsuariodebe estar definido' })
  @IsInt({ message: 'El campo idUsuario debe ser numérico' })
  readonly idUsuario: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombreCompleto no debe estar vacío' })
  @IsString({ message: 'El campo nombreCompleto debe ser de tipo cadena' })
  @MaxLength(150, {
    message: 'El campo nombreCompleto no debe exceder los 150 caracteres',
  })
  @Transform(({ value }): string | undefined =>
    typeof value === 'string' ? value.trim() : value,
  )
  readonly nombreCompleto: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo celular no debe estar vacío' })
  @IsString({ message: 'El campo celular debe ser de tipo cadena' })
  @MaxLength(10, {
    message: 'El campo celular no debe exceder los 10 caracteres',
  })
  @Transform(({ value }): string | undefined =>
    typeof value === 'string' ? value.trim() : value,
  )
  readonly celular: string;

  @ApiProperty()
  @IsDefined({ message: 'El campo puntos de fidelidad debe estar definido' })
  @IsInt({ message: 'El campo puntos de fidelidad debe ser numérico' })
  readonly puntosFidelidad: number;
}
