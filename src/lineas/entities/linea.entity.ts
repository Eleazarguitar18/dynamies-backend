import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'linea' })
export class Linea {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 100 })
  numero: string;
  @Column({ length: 100 })
  color: string;
  // CODIGO DE COLOR EN HEXADECIMAL PARA EL FRONT
  @Column({ length: 150 })
  descripcion: string;
  @Column({ default: true })
  @Column({ nullable: true })
  id_user_create: number;

  @Column({ nullable: true })
  id_user_update?: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
