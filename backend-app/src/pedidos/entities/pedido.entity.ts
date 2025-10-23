import { BaseEntity } from 'src/common/entities/BaseEntity';
import { DetallePedido } from 'src/detalle-pedidos/entities/detalle-pedido.entity';
import { Direccion } from 'src/direcciones/entities/direccion.entity';
import { EstadoPedido } from 'src/estado-pedidos/entities/estado-pedido.entity';
import { MetodoPago } from 'src/metodo-pagos/entities/metodo-pago.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('pedidos')
export class Pedido extends BaseEntity {
  // Fechas y costos
  @Column({ type: 'timestamp', name: 'fecha_pedido' })
  fechaPedido: Date;

  @Column({ type: 'timestamp', name: 'fecha_entrega_estimada', nullable: true })
  fechaEntregaEstimada: Date;

  @Column({ type: 'timestamp', name: 'fecha_entrega_rea', nullable: true })
  fechaEntregaReal: Date;

  @Column({ type: 'varchar', length: 50, name: 'tipo_entrega' })
  tipoEntrega: string; // Ej: 'Estándar', 'Express'

  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
    name: 'costo_envio',
    default: 0,
  })
  costoEnvio: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'costo_total' })
  costoTotal: number;

  // Información de pago
  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
    name: 'referencia_pagos',
  })
  referenciaPagos: string;

  @Column({ type: 'timestamp', nullable: true, name: 'fecha_pago' })
  fechaPago: Date;

  // RELACIONES (Claves Foráneas)
  @Column({ name: 'id_usuario' })
  idUsuario: number;

  @Column({ name: 'id_direccion' })
  idDireccion: number;

  @Column({ name: 'id_estado' })
  idEstado: number;

  @Column({ name: 'id_metodo_pago' })
  idMetodoPago: number;

  // Relaciones N:1
  @ManyToOne(() => Usuario, (usuario) => usuario.pedidos)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @ManyToOne(() => Direccion, (direccion) => direccion.pedidos)
  @JoinColumn({ name: 'id_direccion' })
  direccion: Direccion;

  @ManyToOne(() => EstadoPedido, (estado) => estado.pedidos)
  @JoinColumn({ name: 'id_estado' })
  estado: EstadoPedido;

  @ManyToOne(() => MetodoPago, (metodo) => metodo.pedidos)
  @JoinColumn({ name: 'id_metodo_pago' })
  metodoPago: MetodoPago;

  // Relación 1:N con DetallePedido
  @OneToMany(() => DetallePedido, (detalle) => detalle.pedido)
  detalles: DetallePedido[];
}
