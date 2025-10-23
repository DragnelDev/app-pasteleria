import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { DataSource, In, Repository } from 'typeorm';
import { ProductosService } from 'src/productos/productos.service';
import { Producto } from 'src/productos/entities/producto.entity';
import { DetallePedido } from 'src/detalle-pedidos/entities/detalle-pedido.entity';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidosRepository: Repository<Pedido>,
    private readonly dataSource: DataSource, // Inyectamos el DataSource
    private readonly productosService: ProductosService,
  ) {}

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    // ⭐ CORRECCIÓN 2: Tipado de retorno forzado con el uso de throw/return
    // Para resolver 'Type 'Pedido | null' is not assignable to type 'Pedido''.
    const nuevoPedidoCompleto = await this.dataSource.transaction(
      async (manager) => {
        // --- Paso 1: Obtener productos y Pre-validar ---
        const idsProductos = createPedidoDto.detalles.map((d) => d.idProducto);

        const productosRepo = manager.getRepository(Producto);

        // Usar 'In' de TypeORM
        const productosEncontrados = await productosRepo.findBy({
          id: In(idsProductos),
        });

        if (productosEncontrados.length !== idsProductos.length) {
          throw new NotFoundException('Uno o más productos no existen.');
        }

        // --- Paso 2: Reservar Stock y Recopilar Precios ---
        const itemsParaReserva = createPedidoDto.detalles.map((d) => ({
          idProducto: d.idProducto,
          cantidad: d.cantidad,
        }));

        await this.productosService.reservarStock(
          itemsParaReserva,
          productosRepo, // Repositorio transaccional para el stock
        );

        // Mapeamos productos con precios actuales
        const preciosMap = new Map(
          productosEncontrados.map((p) => [p.id, p.precio]),
        );

        // ⭐ CORRECCIÓN 3: Desestructuración para excluir 'detalles'
        const { detalles, ...pedidoHeaderData } = createPedidoDto;

        // --- Paso 3: Crear la Cabecera del Pedido ---
        const totalDetalles = detalles.reduce((sum, detalle) => {
          const precio = preciosMap.get(detalle.idProducto) || 0;
          return sum + precio * detalle.cantidad;
        }, 0);

        const costoTotal = totalDetalles + pedidoHeaderData.costoEnvio;

        const pedidoData: Partial<Pedido> = {
          ...pedidoHeaderData, // Solo datos de la cabecera
          fechaPedido: new Date(),
          idEstado: 1, // 'Pendiente'
          costoTotal: costoTotal,
        };

        const nuevoPedido = manager.create(Pedido, pedidoData);
        await manager.save(nuevoPedido);

        // --- Paso 4: Crear los Detalles del Pedido ---
        const detallesRepo = manager.getRepository(DetallePedido);

        const detallesEntities = detalles.map((detalleDto) => {
          const precioUnitario = preciosMap.get(detalleDto.idProducto);

          // Se valida que el precio exista antes de crear el detalle
          if (precioUnitario === undefined) {
            // Esto no debería pasar si la pre-validación es correcta, pero es seguridad extra.
            throw new NotFoundException(
              `Precio no encontrado para el producto ID ${detalleDto.idProducto}`,
            );
          }

          return detallesRepo.create({
            idPedido: nuevoPedido.id,
            idProducto: detalleDto.idProducto,
            cantidad: detalleDto.cantidad,
            precioUnitarioFinal: precioUnitario,
            // Las columnas de auditoría son manejadas por el Subscriber
          });
        });

        await detallesRepo.save(detallesEntities);

        // Retorna el pedido completo con sus detalles (para la respuesta)
        const pedidoFinal = await manager.findOne(Pedido, {
          where: { id: nuevoPedido.id },
          relations: [
            'detalles',
            'detalles.producto',
            'usuario',
            'direccion',
            'estado',
          ],
        });

        return pedidoFinal; // El valor retornado por la transacción
      },
    );

    // ⭐ CORRECCIÓN 2b: Si la transacción es exitosa, siempre retornamos el pedido.
    if (!nuevoPedidoCompleto) {
      // Esto solo ocurriría si el findOne anterior falla por alguna razón
      throw new Error('El pedido fue creado, pero no pudo ser recuperado.');
    }
    return nuevoPedidoCompleto;
  }

  // ⭐ Método para obtener todos los pedidos
  async findAll(): Promise<Pedido[]> {
    return this.pedidosRepository.find({ relations: ['estado', 'usuario'] });
  }

  // ⭐ Método para obtener un pedido por ID
  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidosRepository.findOne({ where: { id } });
    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado.`);
    }
    return pedido;
  }

  // ⭐ Método para actualizar (solo si no está en estado final)
  async update(id: number, updatePedidoDto: UpdatePedidoDto) {
    // Lógica para verificar estado, actualizar fecha de entrega, etc.
    return this.pedidosRepository.update(id, updatePedidoDto);
  }

  // ⭐ Método para eliminación (borrado lógico)
  async remove(id: number) {
    // Aplicar borrado lógico
    const result = await this.pedidosRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado.`);
    }
    return { deleted: true };
  }
}
