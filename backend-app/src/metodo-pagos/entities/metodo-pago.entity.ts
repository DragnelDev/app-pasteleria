import { BaseEntity } from 'src/common/entities/BaseEntity';
import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('metodo_pagos')
export class MetodoPago extends BaseEntity {
  @Column({ type: 'varchar', length: 50, unique: true })
  nombre: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  // RELACIONES
  @OneToMany(() => Pedido, (pedido) => pedido.metodoPago)
  pedidos: Pedido[];
}
