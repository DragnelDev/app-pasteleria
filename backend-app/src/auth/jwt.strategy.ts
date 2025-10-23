import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'TU_SECRETO_JWT_SUPER_SEGURO', // Debe coincidir con el del JwtModule
    });
  }

  async validate(payload: JwtPayload) {
    // Aquí puedes buscar el usuario en la BD si necesitas la data más reciente,
    // o simplemente retornar el payload para que esté disponible en request.user
    return {
      userId: payload.sub,
      nombreUsuario: payload.nombreUsuario,
      idRol: payload.idRol,
    };
  }
}

// src/auth/jwt-payload.interface.ts (Necesitas esta interfaz)
export interface JwtPayload {
  nombreUsuario: string;
  idRol: number;
  sub: number; // Típicamente el ID del usuario
}
