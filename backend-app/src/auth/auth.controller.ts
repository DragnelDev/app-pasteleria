import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto'; // Un DTO simple con nombreUsuario y clave

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local')) // Usa la estrategia local para validar credenciales
  @Post('login')
  async login(@Request() req, @Body() loginDto: LoginDto) {
    // Si el guardia local es exitoso, req.user contiene el usuario validado
    return this.authService.login(req.user);
  }
}
