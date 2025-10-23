import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy'; // Para la autenticación con credenciales

@Module({
  imports: [
    UsuariosModule, // Necesitamos el servicio de usuarios
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'TU_SECRETO_JWT_SUPER_SEGURO', // 👈 ¡CAMBIA ESTO EN PRODUCCIÓN (usar config service)!
      signOptions: { expiresIn: '60m' }, // Token expira en 60 minutos
    }),
    TypeOrmModule.forFeature([Usuario]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}
