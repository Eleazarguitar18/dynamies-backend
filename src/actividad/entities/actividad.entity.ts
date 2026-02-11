import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base-entity.audit';
import { Puntuacion } from '../../puntuacion/entities/puntuacion.entity';

@Entity('actividad')
export class Actividad extends BaseEntity {
  @Column()
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'int', default: 0 })
  puntos_base: number;

  @Column({ nullable: true })
  categoria: string;

  @OneToMany(() => Puntuacion, (puntuacion) => puntuacion.actividad)
  puntuaciones: Puntuacion[];
}