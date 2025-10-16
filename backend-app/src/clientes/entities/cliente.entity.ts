import { Direccion } from 'src/direcciones/entities/direccion.entity';
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

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer', { name: 'id_usuario', unique: true })
  idUsuario: number;

  @Column('varchar', { name: 'nombre_completo', length: 150 })
  nombreCompleto: string;

  @Column('varchar', { length: 10 })
  celular: string;

  @Column({ name: 'puntos_fidelidad', type: 'integer', default: 0 })
  puntosFidelidad: number;

  // Columnas para auditoría
  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  // Definición de la relación 1:1. El Cliente es el dueño de la FK.
  @OneToMany(() => Usuario, (usuario) => usuario.clientes)
  @JoinColumn({ name: 'id_usuario', referencedColumnName: 'id' }) // Especificamos la columna de unión (FK)
  usuario: Usuario; // Objeto Usuario asociado

  // Relación 1:N con Direccion (Un cliente puede tener muchas direcciones registradas)
  // 'direccion => direccion.cliente' será la función inversa en la entidad Direccion.
  @OneToMany(() => Direccion, (direccion) => direccion.cliente)
  direcciones: Direccion[];

  // Relación 1:N con Pedido (Un cliente puede generar muchos pedidos)
  // 'pedido => pedido.cliente' será la función inversa en la entidad Pedido.
  @OneToMany(() => Pedido, (pedido) => pedido.cliente)
  pedidos: Pedido[];
}
