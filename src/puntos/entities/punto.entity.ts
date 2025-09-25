import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
@Entity({ name: 'punto' })

export class Punto {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 100 })
  nombre: string;
  @Column({ length: 100 })
  tipo: string;
  @Column({ length: 100 })
  latitud: string;
  @Column({ length: 100 })
  longitud: string;
  @Column({ default: true })
  estado: boolean;

  @Column({ nullable: true })
  id_user_create: number;

  @Column({ nullable: true })
  id_user_update?: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
