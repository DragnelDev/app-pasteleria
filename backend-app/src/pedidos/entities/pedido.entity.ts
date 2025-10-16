import { Cliente } from 'src/clientes/entities/cliente.entity';
import { DetallePedido } from 'src/detalle-pedidos/entities/detalle-pedido.entity';
import { Direccion } from 'src/direcciones/entities/direccion.entity';
import { Personal } from 'src/personales/entities/personal.entity';
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

// Define the enum

export enum PedidoEstado {
  PENDIENTE = 'pendiente',
  EN_PROCESO = 'en_proceso',
  EN_ENVIO = 'en_envio',
  ENTREGADO = 'entregado',
  CANCELADO = 'cancelado',
}
export enum TipoEntrega {
  RECOGER_LOCAL = 'recoger_local',
  ENVIO_DOMICILIO = 'envio_domicilio',
}

export enum MetodoPago {
  TARJETA = 'tarjeta',
  EFECTIVO = 'efectivo',
  TRANSFERENCIA = 'transferencia',
  PUNTOS = 'puntos',
}

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer', { name: 'id_cliente' })
  idCliente: number;

  @Column('integer', { name: 'id_direccion' })
  idDireccion: number;

  @Column('integer', { name: 'id_personal_asignado' })
  idPersonalAsignado: number;

  @Column('timestamp', { name: 'fecha_pedido' })
  fechaPedido: Date;

  @Column('timestamp', { name: 'fecha_entrega', nullable: true })
  fechaEntrega: Date;

  @Column({ name: 'tipo_entrega', type: 'enum', enum: TipoEntrega })
  tipoEntrega: TipoEntrega;

  @Column('decimal', { name: 'costo_envio', precision: 10, scale: 2 })
  costoEnvio: number;

  @Column('decimal', { name: 'costo_total', precision: 10, scale: 2 })
  costoTotal: number;

  @Column({ type: 'enum', enum: PedidoEstado, default: PedidoEstado.PENDIENTE })
  estado: PedidoEstado;

  @Column({ name: 'metodo_pago', type: 'enum', enum: MetodoPago })
  metodoPago: MetodoPago;

  @Column('varchar', { name: 'detalles_pago', length: 200, nullable: true })
  detallesPago: string | null;

  // Columnas para auditoría
  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  // Cliente que realizó el pedido
  @ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
  @JoinColumn({ name: 'id_cliente', referencedColumnName: 'id' })
  cliente: Cliente;

  // Dirección a la que se debe enviar (tomada de la tabla Direccion)
  @ManyToOne(() => Direccion, (direccion) => direccion.pedidos)
  @JoinColumn({ name: 'id_direccion', referencedColumnName: 'id' })
  direccionEntrega: Direccion;

  // Personal asignado para gestionar/entregar el pedido
  @ManyToOne(() => Personal, (personal) => personal.pedidosAsignados)
  @JoinColumn({ name: 'id_personal_asignado', referencedColumnName: 'id' })
  personalAsignado: Personal; // Puede ser nulo al inicio

  // Un Pedido contiene muchos DetallePedido
  @OneToMany(() => DetallePedido, (detalle) => detalle.pedido)
  detalles: DetallePedido[];
}
