import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'nombreUsuario', // El campo que usará el cliente
    });
  }

  async validate(nombreUsuario: string, clave: string): Promise<any> {
    const user = await this.authService.validateUser(nombreUsuario, clave);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }
    // Retorna el usuario sin la clave (hash)
    const { clave: _, ...result } = user;
    return result;
  }
}
