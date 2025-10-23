import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty({
    description: 'Nombre de usuario único para login.',
    minLength: 4,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  nombreUsuario: string;

  @ApiProperty({ description: 'Apellidos completos del usuario.' })
  @IsNotEmpty()
  @IsString()
  apellidos: string;

  @ApiProperty({
    description:
      'Contraseña del usuario (se recomienda un mínimo de 8 caracteres).',
    minLength: 8,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  clave: string; // Nota: el hashing se hace en el servicio

  @ApiProperty({
    description: 'Número de celular (opcional).',
    required: false,
  })
  @IsString()
  @MaxLength(20)
  celular?: string;

  @ApiProperty({ description: 'Correo electrónico único.', format: 'email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'ID del rol asignado (e.g., 1 para Cliente, 2 para Admin).',
  })
  @IsNotEmpty()
  @IsInt()
  idRol: number;
}
