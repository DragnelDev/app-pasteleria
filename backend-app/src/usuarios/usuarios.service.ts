import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private usuariosRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    if (!createUsuarioDto.email || !createUsuarioDto.passwordHash) {
      throw new ConflictException('El email y la contraseña son requeridos');
    }

    const emailTrimmed = createUsuarioDto.email.trim();
    const existe = await this.usuariosRepository.findOneBy({
      email: emailTrimmed,
    });
    if (existe) throw new ConflictException('El usuario ya existe');

    const usuario = new Usuario();
    usuario.email = emailTrimmed;
    usuario.passwordHash = createUsuarioDto.passwordHash.trim();
    usuario.activo = createUsuarioDto.activo;
    return this.usuariosRepository.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOneBy({ id });
    if (!usuario) throw new NotFoundException('El usuario no existe');
    return usuario;
  }

  async findByEmail(email: string): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOneBy({ email });
    if (!usuario) throw new NotFoundException('El usuario no existe');
    return usuario;
  }

  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    const usuario = await this.findOne(id);

    // Si se está actualizando el email, verificar que no exista otro usuario con ese email
    if (updateUsuarioDto.email) {
      const emailTrimmed = updateUsuarioDto.email.trim();
      const existeEmail = await this.usuariosRepository.findOne({
        where: {
          email: emailTrimmed,
        },
      });

      if (existeEmail && existeEmail.id !== id) {
        throw new ConflictException('Ya existe un usuario con ese email');
      }

      updateUsuarioDto.email = emailTrimmed;
    }

    // Si se está actualizando la contraseña, asegurarse de que esté limpia de espacios
    if (updateUsuarioDto.passwordHash) {
      updateUsuarioDto.passwordHash = updateUsuarioDto.passwordHash.trim();
    }

    const usuarioUpdate = Object.assign(usuario, updateUsuarioDto);
    return this.usuariosRepository.save(usuarioUpdate);
  }

  async remove(id: number) {
    const usuario = await this.findOne(id);
    return this.usuariosRepository.softRemove(usuario);
  }
}
