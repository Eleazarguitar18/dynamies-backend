import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Puntuacion } from './entities/puntuacion.entity';
import { Grupo } from '../grupo/entities/grupo.entity';
import { CreatePuntuacionDto } from './dto/create-puntuacion.dto';

@Injectable()
export class PuntuacionService {
  constructor(
    @InjectRepository(Puntuacion)
    private readonly puntuacionRepo: Repository<Puntuacion>,
    @InjectRepository(Grupo)
    private readonly grupoRepo: Repository<Grupo>,
    private readonly dataSource: DataSource, // Para la transacción
  ) {}

  async create(dto: CreatePuntuacionDto, userId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Verificar que el grupo existe
      const grupo = await queryRunner.manager.findOne(Grupo, {
        where: { id: dto.id_grupo, estado: true },
      });
      if (!grupo)
        throw new NotFoundException('El grupo no existe o está inactivo');

      // 2. Crear el registro de puntuación
      const nuevaPuntuacion = queryRunner.manager.create(Puntuacion, {
        ...dto,
        id_user_created: userId,
      });
      const guardada = await queryRunner.manager.save(nuevaPuntuacion);

      // 3. ACTUALIZACIÓN CRÍTICA: Sumar puntos al grupo
      // Usamos una operación matemática directa para evitar problemas de concurrencia
      grupo.puntos_total += dto.monto;
      await queryRunner.manager.save(grupo);

      // Si todo sale bien, confirmamos los cambios
      await queryRunner.commitTransaction();
      return guardada;
    } catch (error) {
      // Si algo falla, revertimos TODO
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Liberamos el query runner
      await queryRunner.release();
    }
  }

  async findAllByGrupo(id_grupo: number) {
    return await this.puntuacionRepo.find({
      where: { id_grupo, estado: true },
      relations: ['actividad'],
      order: { created_at: 'DESC' },
      // select: {
      //   // Opcional: Seleccionamos solo lo que nos interesa
      //   id: true,
      //   monto: true,
      //   motivo: true,
      //   created_at: true,
      //   actividad: {
      //     nombre: true,
      //     categoria: true,
      //   },
      // },
    });
  }
}
