import { BaseEntity } from 'src/common/entities/BaseEntity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('roles')
export class Rol extends BaseEntity {
  @Column({ type: 'varchar', length: 50, unique: true })
  nombre: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  descripcion: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  // RELACIONES
  // Relación 1:N con Usuario
  @OneToMany(() => Usuario, (usuario) => usuario.rol)
  usuarios: Usuario[];
}
