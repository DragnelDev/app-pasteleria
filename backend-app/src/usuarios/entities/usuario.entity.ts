import { Direccion } from 'src/direcciones/entities/direccion.entity';
import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { Rol } from 'src/roles/entities/rol.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
    name: 'nombre_usuario',
  })
  nombreUsuario: string;

  @Column({ type: 'varchar', length: 150 })
  apellidos: string;

  @Column({ type: 'varchar' })
  clave: string; // La contraseña debe estar HASHEDA

  @Column({ type: 'varchar', length: 20, nullable: true })
  celular: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  // RELACIONES (Claves Foráneas)
  @Column({ name: 'id_rol' })
  idRol: number; // Campo para la FK

  // Relación N:1 con Rol
  @ManyToOne(() => Rol, (rol) => rol.usuarios)
  @JoinColumn({ name: 'id_rol' })
  rol: Rol;

  // Relación 1:N con Direccion
  @OneToMany(() => Direccion, (direccion) => direccion.usuario)
  direcciones: Direccion[];

  // Relación 1:N con Pedido
  @OneToMany(() => Pedido, (pedido) => pedido.usuario)
  pedidos: Pedido[];

  // Columnas de Auditoría (Solo Fechas)
  @Column({ type: 'timestamp', name: 'fecha_creacion' })
  fechaCreacion: Date;

  @Column({ type: 'timestamp', name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @Column({ type: 'timestamp', name: 'fecha_eliminacion', nullable: true })
  fechaEliminacion: Date | null;
}
