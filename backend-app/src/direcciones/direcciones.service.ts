import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Direccion } from './entities/direccion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DireccionesService {
  constructor(
    @InjectRepository(Direccion)
    private direccionesRepository: Repository<Direccion>,
  ) {}

  async create(createDireccionDto: CreateDireccionDto): Promise<Direccion> {
    let direccion = await this.direccionesRepository.findOneBy({});
    direccion = new Direccion();
    Object.assign(direccion, createDireccionDto);
    return this.direccionesRepository.save(direccion);
  }

  async findAll(): Promise<Direccion[]> {
    return this.direccionesRepository.find();
  }

  async findOne(id: number): Promise<Direccion> {
    const direccion = await this.direccionesRepository.findOne({
      where: { id },
      relations: { usuario: true }, // ⭐ CORRECCIÓN: 'usuario' es el nombre de la propiedad en la entidad Direccion
    });
    if (!direccion) throw new NotFoundException('El direccion no existe');
    return direccion;
  }

  async update(
    id: number,
    updateDireccionDto: UpdateDireccionDto,
  ): Promise<Direccion> {
    const direccion = await this.findOne(id);
    Object.assign(direccion, updateDireccionDto);
    return this.direccionesRepository.save(direccion);
  }

  async remove(id: number): Promise<Direccion> {
    const direccion = await this.findOne(id);
    return this.direccionesRepository.softRemove(direccion);
  }
}
