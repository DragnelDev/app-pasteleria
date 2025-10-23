import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productosRepository: Repository<Producto>,
  ) {}

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    let producto = await this.productosRepository.findOneBy({});
    producto = new Producto();
    Object.assign(producto, createProductoDto);
    return this.productosRepository.save(producto);
  }

  async findAll(): Promise<Producto[]> {
    return this.productosRepository.find();
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productosRepository.findOneBy({ id });
    if (!producto) throw new NotFoundException('El producto no existe');
    return producto;
  }

  async reservarStock(
    items: { idProducto: number; cantidad: number }[],
    manager: Repository<Producto>,
  ): Promise<void> {
    // 1. Itera sobre cada artículo del pedido
    for (const item of items) {
      const producto = await manager.findOne({
        where: { id: item.idProducto },
        lock: { mode: 'pessimistic_write' }, // Bloquea la fila para evitar condiciones de carrera
      });

      if (!producto || !producto.activo) {
        throw new NotFoundException(
          `Producto con ID ${item.idProducto} no encontrado o inactivo.`,
        );
      }

      if (producto.stockActual < item.cantidad) {
        throw new BadRequestException(
          `Stock insuficiente para el producto ${producto.nombre}. Disponible: ${producto.stockActual}, Solicitado: ${item.cantidad}.`,
        );
      }

      // 2. Decrementa el stock
      producto.stockActual -= item.cantidad;

      // 3. Guarda el producto dentro de la transacción
      await manager.save(producto);
    }
  }

  async update(
    id: number,
    updateProductoDto: UpdateProductoDto,
  ): Promise<Producto> {
    const producto = await this.findOne(id);
    Object.assign(producto, updateProductoDto);
    return this.productosRepository.save(producto);
  }

  async remove(id: number): Promise<Producto> {
    const producto = await this.findOne(id);
    return this.productosRepository.softRemove(producto);
  }
}
