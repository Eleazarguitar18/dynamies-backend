import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grupo } from './entities/grupo.entity';
@Injectable()
export class GrupoService {
  constructor(
    @InjectRepository(Grupo)
    private readonly grupoRepository: Repository<Grupo>,
  ) {}
  async create(createGrupoDto: CreateGrupoDto, idUserCreated: number) {
    // 1. Verificar si el nombre ya existe (opcional, el @Column({unique:true}) ya protege la BD)
    const existe = await this.grupoRepository.findOne({
      where: { nombre: createGrupoDto.nombre, estado: true },
    });

    if (existe) {
      throw new BadRequestException(
        `El grupo con nombre ${createGrupoDto.nombre} ya existe.`,
      );
    }

    // 2. Crear la instancia con los datos del DTO y auditoría
    const nuevoGrupo = this.grupoRepository.create({
      ...createGrupoDto,
      puntos_total: 0, // Todo grupo inicia en cero
      id_user_created: idUserCreated,
    });

    // 3. Guardar en la base de datos
    return await this.grupoRepository.save(nuevoGrupo);
  }
  // src/grupo/grupo.service.ts

  async findAll() {
    const grupos= await this.grupoRepository.find({
      where: { estado: true },
      order: { nombre: 'ASC' }, // Los ordenamos alfabéticamente
    });
    if (grupos.length === 0) {
      throw new NotFoundException('No hay grupos activos disponibles.');
    }
    return grupos;
  }

  async getRanking() {
    return await this.grupoRepository.find({
      where: { estado: true },
      order: { puntos_total: 'DESC' }, // Los más altos primero
      take: 10, // Opcional: solo los top 10
    });
  }
  findOne(id: number) {
    return `This action returns a #${id} grupo`;
  }

  async update(
    id: number,
    updateGrupoDto: UpdateGrupoDto,
    idUserUpdated: number,
  ) {
    // Buscamos y preparamos la entidad con los nuevos datos
    const grupo = await this.grupoRepository.preload({
      id: id,
      ...updateGrupoDto,
      id_user_updated: idUserUpdated,
    });

    if (!grupo) {
      throw new NotFoundException(
        `El grupo con ID ${id} no existe o ya fue eliminado`,
      );
    }

    return await this.grupoRepository.save(grupo);
  }
  // src/grupo/grupo.service.ts

  async remove(id: number, idUserUpdated: number) {
    // 1. Buscamos el grupo que esté activo
    const grupo = await this.grupoRepository.findOne({
      where: { id, estado: true },
    });

    // 2. Si no existe o ya está en false, lanzamos error
    if (!grupo) {
      throw new NotFoundException(
        `El grupo con ID ${id} no existe o ya fue eliminado`,
      );
    }

    // 3. Cambiamos el estado y registramos quién lo "eliminó"
    grupo.estado = false;
    grupo.id_user_updated = idUserUpdated;

    // 4. Guardamos los cambios
    await this.grupoRepository.save(grupo);

    return {
      message: `El grupo "${grupo.nombre}" ha sido eliminado correctamente`,
    };
  }
  // src/grupo/grupo.service.ts

  async restore(id: number, idUserUpdated: number) {
    // 1. Buscamos el grupo que esté desactivado (estado: false)
    const grupo = await this.grupoRepository.findOne({
      where: { id, estado: false },
    });

    // 2. Si no existe o ya está activo, avisamos al usuario
    if (!grupo) {
      throw new NotFoundException(
        `El grupo con ID ${id} no está en la papelera o ya está activo`,
      );
    }

    // 3. Restauramos el estado y actualizamos auditoría
    grupo.estado = true;
    grupo.id_user_updated = idUserUpdated;

    await this.grupoRepository.save(grupo);

    return {
      message: `El grupo "${grupo.nombre}" ha sido restaurado con éxito`,
      data: grupo,
    };
  }

  async findAllDeleted() {
    return await this.grupoRepository.find({
      where: { estado: false },
      order: { updated_at: 'DESC' }, // Ver los últimos eliminados primero
    });
  }
}
