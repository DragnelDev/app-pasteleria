import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombreUsuario: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  clave: string;
}
