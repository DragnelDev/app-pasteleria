export interface JwtPayload {
  nombreUsuario: string;
  idRol: number;
  sub: number; // ID del usuario
}
