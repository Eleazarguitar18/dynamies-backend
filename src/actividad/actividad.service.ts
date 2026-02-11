import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actividad } from './entities/actividad.entity';
import { CreateActividadDto, UpdateActividadDto } from './dto/create-actividad.dto';

@Injectable()
export class ActividadService {
  constructor(
    @InjectRepository(Actividad)
    private readonly actividadRepo: Repository<Actividad>,
  ) {}

  async create(dto: CreateActividadDto, userId: number) {
    const nueva = this.actividadRepo.create({
      ...dto,
      id_user_created: userId,
    });
    return await this.actividadRepo.save(nueva);
  }

  async findAll() {
    return await this.actividadRepo.find({
      where: { estado: true },
      order: { nombre: 'ASC' },
    });
  }

  async update(id: number, dto: UpdateActividadDto, userId: number) {
    const actividad = await this.actividadRepo.preload({
      id,
      ...dto,
      id_user_updated: userId,
    });
    if (!actividad) throw new NotFoundException(`Actividad #${id} no encontrada`);
    return await this.actividadRepo.save(actividad);
  }

  async remove(id: number, userId: number) {
    const actividad = await this.actividadRepo.findOneBy({ id, estado: true });
    if (!actividad) throw new NotFoundException(`Actividad #${id} no existe`);
    
    actividad.estado = false;
    actividad.id_user_updated = userId;
    await this.actividadRepo.save(actividad);
    return { message: 'Actividad desactivada' };
  }

  async restore(id: number, userId: number) {
    const actividad = await this.actividadRepo.findOneBy({ id, estado: false });
    if (!actividad) throw new NotFoundException(`Actividad #${id} no está en papelera`);
    
    actividad.estado = true;
    actividad.id_user_updated = userId;
    return await this.actividadRepo.save(actividad);
  }
}