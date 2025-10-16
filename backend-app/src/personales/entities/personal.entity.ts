import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('personales')
export class Personal {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer', { name: 'id_usuario', unique: true })
  idUsuario: number;

  @Column('varchar', { name: 'nombre_completo', length: 150 })
  nombreCompleto: string;

  @Column('varchar', { length: 10 })
  celular: string;

  @CreateDateColumn({ name: 'fecha_contratacion' })
  fechaContratacion: Date;

  @Column('enum', { enum: ['administrador', 'pastelero', 'repartidor'] })
  rol: string;

  @Column('boolean', { default: true })
  activo: boolean;

  // Columnas para auditoría
  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  // Definición de la relación 1:1. El Personal es el dueño de la FK.
  @OneToMany(() => Usuario, (usuario) => usuario.personales)
  @JoinColumn({ name: 'id_usuario', referencedColumnName: 'id' }) // Especificamos la columna de unión (FK)
  usuario: Usuario; // Objeto Usuario asociado

  // Relación 1:N con Pedido (Un personal puede gestionar muchos pedidos)
  // 'pedido => pedido.personalAsignado' será la función inversa en la entidad Pedido.
  @OneToMany(() => Pedido, (pedido) => pedido.personalAsignado)
  pedidosAsignados: Pedido[];
}
