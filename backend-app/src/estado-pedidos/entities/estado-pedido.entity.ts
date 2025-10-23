import { BaseEntity } from 'src/common/entities/BaseEntity';
import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('estado_pedidos')
export class EstadoPedido extends BaseEntity {
  @Column({ type: 'varchar', length: 50, unique: true })
  nombre: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  descripcion: string;

  // RELACIONES
  @OneToMany(() => Pedido, (pedido) => pedido.estado)
  pedidos: Pedido[];
}
