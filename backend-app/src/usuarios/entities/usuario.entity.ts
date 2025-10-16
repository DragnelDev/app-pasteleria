import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Personal } from 'src/personales/entities/personal.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 100 })
  @Index({ unique: true })
  email: string;

  @Column('varchar', { name: 'password_hash', length: 250 })
  passwordHash: string;

  @CreateDateColumn({ name: 'fecha_registro' })
  fechaRegistro: Date;

  @Column('boolean', { default: true })
  activo: boolean;

  // Columnas para auditoría
  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  // Relación 1:1 con la entidad Cliente
  @OneToOne(() => Cliente, (cliente) => cliente.usuario)
  clientes: Cliente[]; // Objeto Cliente asociado

  // Relación 1:1 con la entidad Personal
  @OneToOne(() => Personal, (personal) => personal.usuario)
  personales: Personal[]; // Objeto Personal asociado
}
