import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base-entity.audit';
import { Grupo } from '../../grupo/entities/grupo.entity';
import { Actividad } from '../../actividad/entities/actividad.entity';

@Entity('puntuacion')
export class Puntuacion extends BaseEntity {
  @Column()
  monto: number;

  @Column({ type: 'text' })
  motivo: string;

  @ManyToOne(() => Grupo)
  @JoinColumn({ name: 'id_grupo' })
  grupo: Grupo;

  @Column()
  id_grupo: number;

  @ManyToOne(() => Actividad, (actividad) => actividad.puntuaciones)
  @JoinColumn({ name: 'id_actividad' })
  actividad: Actividad;

  @Column({ nullable: true })
  id_actividad: number;

  @Column({ nullable: true })
  url_evidencia: string;
}