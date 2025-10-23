import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDetallePedidoDto } from './dto/create-detalle-pedido.dto';
import { UpdateDetallePedidoDto } from './dto/update-detalle-pedido.dto';
import { DetallePedido } from './entities/detalle-pedido.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Producto } from '../productos/entities/producto.entity';
import { Pedido } from '../pedidos/entities/pedido.entity';

@Injectable()
export class DetallePedidosService {
  constructor(
    @InjectRepository(DetallePedido)
    private detallePedidosRepository: Repository<DetallePedido>,
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
    @InjectRepository(Pedido)
    private pedidosMainRepository: Repository<Pedido>,
    private dataSource: DataSource,
  ) {}

  private async validarProducto(idProducto: number): Promise<Producto> {
    const producto = await this.productosRepository.findOne({
      where: { id: idProducto },
    });

    if (!producto) {
      throw new NotFoundException('El producto no existe');
    }

    if (!producto.activo) {
      throw new BadRequestException('El producto no está disponible');
    }

    // Aquí puedes agregar la validación de stock si tienes esa columna
    return producto;
  }

  async validarPedido(idPedido: number) {
    const pedido = await this.detallePedidosRepository.findOne({
      where: { id: idPedido },
      relations: ['estado'], // Asegúrate de cargar la relación
    });

    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${idPedido} no encontrado.`);
    }
  }

  async create(
    createDetallePedidoDto: CreateDetallePedidoDto,
  ): Promise<DetallePedido> {
    // Iniciamos una transacción
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Validamos que existan el producto y el pedido
      const producto = await this.validarProducto(
        createDetallePedidoDto.idProducto,
      );
      await this.validarPedido(createDetallePedidoDto.idPedido);

      // Si no se especifica un precio, usamos el precio actual del producto
      if (!createDetallePedidoDto.precioUnitarioFinal) {
        createDetallePedidoDto.precioUnitarioFinal = producto.precio;
      }

      const detallePedido = new DetallePedido();
      Object.assign(detallePedido, createDetallePedidoDto);

      // Guardamos el detalle usando el queryRunner
      const detalleSaved = await queryRunner.manager.save(
        DetallePedido,
        detallePedido,
      );

      // Actualizamos el total del pedido
      const detalles = await queryRunner.manager.find(DetallePedido, {
        where: { idPedido: createDetallePedidoDto.idPedido },
      });

      const total = detalles.reduce(
        (sum, detalle) => sum + detalle.precioUnitarioFinal * detalle.cantidad,
        0,
      );

      await queryRunner.manager.update(
        Pedido,
        createDetallePedidoDto.idPedido,
        {
          costoTotal: total,
        },
      );

      await queryRunner.commitTransaction();
      return detalleSaved;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<DetallePedido[]> {
    return this.detallePedidosRepository.find({
      relations: {
        pedido: true,
        producto: true,
      },
    });
  }

  async findOne(id: number): Promise<DetallePedido> {
    const detallePedido = await this.detallePedidosRepository.findOne({
      where: { id },
      relations: {
        pedido: true,
        producto: true,
      },
    });
    if (!detallePedido)
      throw new NotFoundException('El detalle pedido no existe');
    return detallePedido;
  }

  async update(
    id: number,
    updateDetallePedidoDto: UpdateDetallePedidoDto,
  ): Promise<DetallePedido> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Buscamos el detalle usando el queryRunner
      const detallePedido = await queryRunner.manager.findOne(DetallePedido, {
        where: { id },
        relations: {
          pedido: true,
          producto: true,
        },
      });

      if (!detallePedido) {
        throw new NotFoundException('El detalle pedido no existe');
      }

      // Si se está actualizando el producto o la cantidad, validamos
      if (updateDetallePedidoDto.idProducto) {
        detallePedido.cantidad =
          updateDetallePedidoDto.cantidad || detallePedido.cantidad;
        await this.detallePedidosRepository.save(detallePedido);
      }

      // Actualizamos el detalle
      Object.assign(detallePedido, updateDetallePedidoDto);
      const detalleSaved = await queryRunner.manager.save(
        DetallePedido,
        detallePedido,
      );

      // Actualizamos el total del pedido
      const detalles = await queryRunner.manager.find(DetallePedido, {
        where: { idPedido: detallePedido.idPedido },
      });

      const total = detalles.reduce(
        (sum, detalle) => sum + detalle.precioUnitarioFinal * detalle.cantidad,
        0,
      );

      await queryRunner.manager.update(Pedido, detallePedido.idPedido, {
        costoTotal: total,
      });

      await queryRunner.commitTransaction();
      return detalleSaved;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<DetallePedido> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const detallePedido = await queryRunner.manager.findOne(DetallePedido, {
        where: { id },
        relations: {
          pedido: true,
          producto: true,
        },
      });

      if (!detallePedido) {
        throw new NotFoundException('El detalle pedido no existe');
      }

      // Guardamos el idPedido antes de eliminar
      const idPedido = detallePedido.idPedido;

      // Eliminamos el detalle
      const removedDetail = await queryRunner.manager.softRemove(
        DetallePedido,
        detallePedido,
      );

      // Actualizamos el total del pedido
      const detalles = await queryRunner.manager.find(DetallePedido, {
        where: { idPedido },
      });

      const total = detalles.reduce(
        (sum, detalle) => sum + detalle.precioUnitarioFinal * detalle.cantidad,
        0,
      );

      await queryRunner.manager.update(Pedido, idPedido, {
        costoTotal: total,
      });

      await queryRunner.commitTransaction();
      return removedDetail;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
