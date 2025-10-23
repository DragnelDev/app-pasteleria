import { BaseEntity } from 'src/common/entities/BaseEntity';
import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('detalle_pedidos')
export class DetallePedido extends BaseEntity {
  @Column({ type: 'int' })
  cantidad: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'precio_unitario_final',
  })
  precioUnitarioFinal: number; // El precio que se cobró realmente

  @Column({ type: 'text', nullable: true, name: 'notas_especiales' })
  notasEspeciales: string;

  // RELACIONES (Claves Foráneas)
  @Column({ name: 'id_pedido' })
  idPedido: number;

  @Column({ name: 'id_producto' })
  idProducto: number;

  // Relaciones N:1
  @ManyToOne(() => Pedido, (pedido) => pedido.detalles)
  @JoinColumn({ name: 'id_pedido' })
  pedido: Pedido;

  @ManyToOne(() => Producto, (producto) => producto.detallesPedido)
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;
}
