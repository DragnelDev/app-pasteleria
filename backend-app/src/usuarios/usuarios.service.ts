import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    // 1. Validar unicidad (ejemplo simple, TypeORM lo hace por defecto, pero es buena práctica)
    const existingUser = await this.usuariosRepository.findOne({
      where: [
        { nombreUsuario: createUsuarioDto.nombreUsuario },
        { email: createUsuarioDto.email },
      ],
    });

    if (existingUser) {
      throw new BadRequestException(
        'El nombre de usuario o email ya están registrados.',
      );
    }

    // 2. Hashing de la contraseña (Lógica de Seguridad CLAVE)
    const hashedPassword = await bcrypt.hash(createUsuarioDto.clave, 10);

    // 3. Crear la instancia de la entidad
    const usuario = this.usuariosRepository.create({
      ...createUsuarioDto,
      clave: hashedPassword, // Sobrescribir la clave con el hash
    });

    // 4. Guardar y retornar
    return this.usuariosRepository.save(usuario);
  }

  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    // 1. Clonar el DTO para evitar mutaciones inesperadas y hashear
    const updateData: Partial<Usuario> = { ...updateUsuarioDto };

    // Si se proporciona una nueva clave, hashearla antes de actualizar
    if (updateData.clave) {
      // ⭐ CORRECCIÓN/VERIFICACIÓN: Asegúrate de que bcrypt esté importado
      updateData.clave = await bcrypt.hash(updateData.clave, 10);
    }

    // 2. Realizar la actualización en la base de datos
    const result = await this.usuariosRepository.update(id, updateData); // ⭐ AJUSTA ESTE NOMBRE SI ES NECESARIO

    // 3. Validar si se encontró y actualizó algo
    if (result.affected === 0) {
      // Usamos NotFoundException, ya que el ID no existe
      throw new NotFoundException(
        `Usuario con ID ${id} no encontrado para actualizar.`,
      );
    }

    // 4. Obtener y retornar el registro actualizado
    // ⭐ CORRECCIÓN: Usar this.findOne(id) para manejar el caso null/NotFoundException
    // Si no tienes un método findOne que lance una excepción, haz la validación aquí:

    const usuarioActualizado = await this.usuariosRepository.findOne({
      where: { id },
      relations: ['rol'], // Incluir relaciones si son importantes para el frontend
    });

    // Este check debería ser redundante si el result.affected > 0, pero es buena práctica.
    if (!usuarioActualizado) {
      throw new NotFoundException(
        `Error al recuperar el usuario con ID ${id} después de actualizar.`,
      );
    }

    return usuarioActualizado;
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find({ relations: ['rol'] });
  }

  async findOne(id: number): Promise<Usuario> {
    // Promesa de Usuario (no Usuario | null)
    const user = await this.usuariosRepository.findOne({
      where: { id },
      relations: ['rol'],
    });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`); // ⭐ Manejar el caso null
    }
    return user;
  }

  async remove(id: number) {
    const result = await this.usuariosRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }
    return { deleted: true, id };
  }
}
