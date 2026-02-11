import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base-entity.audit';

@Entity('grupo')
export class Grupo extends BaseEntity {
  @Column({ unique: true })
  nombre: string;

  @Column({ nullable: true })
  color_hex: string;

  @Column({ default: 0 })
  puntos_total: number;
}