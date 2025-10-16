import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Pedido } from 'src/pedidos/entities/pedido.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('direcciones')
export class Direccion {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer', { name: 'id_cliente' })
  id_cliente: number;

  @Column('varchar', { length: 200 })
  calle: string;

  @Column('varchar', { length: 10 })
  numero: string;

  @Column('varchar', { length: 100 })
  ciudad: string;

  @Column('varchar', { name: 'codigo_postal', length: 10 })
  codigoPostal: string;

  @Column('boolean', { name: 'es_principal', default: false })
  esPrincipal: boolean;

  // Columnas para auditoría
  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  // Define la relación N:1. Muchas Direcciones pertenecen a un Cliente.
  @ManyToOne(() => Cliente, (cliente) => cliente.direcciones)
  @JoinColumn({ name: 'id_cliente', referencedColumnName: 'id' }) // Especifica la columna FK
  cliente: Cliente;

  // Una Dirección puede ser utilizada en múltiples Pedidos.
  @OneToMany(() => Pedido, (pedido) => pedido.direccionEntrega)
  pedidos: Pedido[];
}
