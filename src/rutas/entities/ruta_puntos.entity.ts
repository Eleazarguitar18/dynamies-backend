import { BaseEntityAudit } from 'src/common/filters/entities/base-entity.audit';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ruta } from './ruta.entity';
import { Punto } from 'src/puntos/entities/punto.entity';
@Entity({ name: 'ruta_puntos' })
export class RutaPunto extends BaseEntityAudit {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Ruta, { eager: true })
  @JoinColumn({ name: 'id_ruta' })
  ruta: Ruta;
  @ManyToOne(() => Punto, { eager: true })
  @JoinColumn({ name: 'id_punto' })
  punto: Punto;
  @Column()
  orden: number;
  // NUEVA COLUMNA: Distancia al siguiente punto en metros
  // Usamos 'decimal' o 'float' para precisión, con default 0
  @Column({
    name: 'distancia_siguiente',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true, // Esto es vital
    default: 0, // Por si acaso no viene nada
  })
  distancia_siguiente: number;
}
