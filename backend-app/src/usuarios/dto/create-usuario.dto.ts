import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo email no debe estar vacío' })
  @IsString({ message: 'El campo email debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo email no debe exceder los 100 caracteres',
  })
  @Transform(({ value }): string | undefined =>
    typeof value === 'string' ? value.trim() : value,
  )
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo passwordHash no debe estar vacío' })
  passwordHash: string;

  @ApiProperty()
  @IsDefined({ message: 'El campo fecha de registro debe estar definido' })
  @IsDateString(
    {},
    { message: 'El campo fecha de registro debe ser una fecha válida' },
  )
  readonly fechaRegistro: Date;

  @ApiProperty()
  @IsBoolean({ message: 'El campo activo debe ser un valor booleano' })
  @Transform(({ value }): boolean => Boolean(value))
  @IsDefined({ message: 'El campo activo debe estar definido' })
  readonly activo: boolean;
}
