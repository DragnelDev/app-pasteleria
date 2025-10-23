import { BaseEntity } from 'src/common/entities/BaseEntity';
import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('direcciones')
export class Direccion extends BaseEntity {
  @Column({ type: 'varchar', length: 150 })
  calle: string;

  @Column({ type: 'varchar', length: 20 })
  numero: string;

  @Column({ type: 'varchar', length: 100 })
  ciudad: string;

  @Column({ type: 'boolean', default: false, name: 'es_principal' })
  esPrincipal: boolean;

  // RELACIONES (Claves Foráneas)
  @Column({ name: 'id_usuario' })
  idUsuario: number;

  // Relación N:1 con Usuario
  @ManyToOne(() => Usuario, (usuario) => usuario.direcciones)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  // Relación 1:N con Pedido (una dirección puede ser usada para muchos pedidos)
  @OneToMany(() => Pedido, (pedido) => pedido.direccion)
  pedidos: Pedido[];
}
