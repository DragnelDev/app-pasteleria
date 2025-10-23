import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Fechas de Auditoría
  @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    name: 'fecha_eliminacion',
    nullable: true,
  })
  fechaEliminacion: Date | null;

  // Usuarios de Auditoría (Claves Foráneas a la tabla Usuario)
  // Nota: Estas columnas deben ser manejadas por el servicio o en un Subscriber de TypeORM
  @Column({ type: 'int', name: 'id_usuario_creacion', nullable: true })
  idUsuarioCreacion: number;

  @Column({ type: 'int', name: 'id_usuario_modificacion', nullable: true })
  idUsuarioModificacion: number;
}
