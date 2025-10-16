import { DetallePedido } from 'src/detalle-pedidos/entities/detalle-pedido.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 100 })
  nombre: string;

  @Column('varchar', { length: 500 })
  descripcion: string;

  @Column('decimal', { name: 'precio_base', precision: 10, scale: 2 })
  precioBase: number;

  @Column('integer', { name: 'stock_actual' })
  stockActual: number;

  @Column('boolean', { name: 'requiere_personalizacion', default: false })
  requierePersonalizacion: boolean;

  @Column('boolean', { default: true })
  activo: boolean;

  // Columnas para auditoría
  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  // Un Producto puede aparecer en muchos DetallePedido.
  @OneToMany(() => DetallePedido, (detalle) => detalle.producto)
  detallesPedido: DetallePedido[];
}
