import { Categoria } from 'src/categorias/entities/categoria.entity';
import { BaseEntity } from 'src/common/entities/BaseEntity';
import { DetallePedido } from 'src/detalle-pedidos/entities/detalle-pedido.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('productos')
export class Producto extends BaseEntity {
  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column({ type: 'int', name: 'stock_actual' })
  stockActual: number;

  @Column({ type: 'boolean', default: false, name: 'requiere_personalizacion' })
  requierePersonalizacion: boolean;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  // RELACIONES (Claves Foráneas)
  @Column({ name: 'id_categoria', nullable: true })
  idCategoria: number;

  // Relación N:1 con Categoria
  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  @JoinColumn({ name: 'id_categoria' })
  categoria: Categoria;

  // Relación 1:N con DetallePedido
  @OneToMany(() => DetallePedido, (detalle) => detalle.producto)
  detallesPedido: DetallePedido[];
}
