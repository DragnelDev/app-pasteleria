import { BaseEntity } from 'src/common/entities/BaseEntity';
import { Producto } from 'src/productos/entities/producto.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('categorias')
export class Categoria extends BaseEntity {
  @Column({ type: 'varchar', length: 100, unique: true })
  nombre: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  descripcion: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  // RELACIONES
  @OneToMany(() => Producto, (producto) => producto.categoria)
  productos: Producto[];
}
