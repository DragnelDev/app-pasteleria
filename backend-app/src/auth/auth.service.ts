import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    nombreUsuario: string,
    clave: string,
  ): Promise<Usuario | null> {
    const user = await this.usuarioRepository.findOne({
      where: { nombreUsuario },
      relations: ['rol'], // Opcional: cargar el rol si lo necesitas
    });

    if (user && (await bcrypt.compare(clave, user.clave))) {
      // Devolver el usuario si la clave es correcta
      return user;
    }
    return null; // Credenciales inválidas
  }

  async login(user: Usuario) {
  const payload: JwtPayload = {
      nombreUsuario: user.nombreUsuario,
      sub: user.id,
      idRol: user.idRol,
    };

    // Retorna el token que el cliente usará en el header 'Authorization: Bearer <token>'
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
