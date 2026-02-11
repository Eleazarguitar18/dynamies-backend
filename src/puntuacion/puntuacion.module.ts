import { Module } from '@nestjs/common';
import { PuntuacionService } from './puntuacion.service';
import { PuntuacionController } from './puntuacion.controller';
import { Puntuacion } from './entities/puntuacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grupo } from 'src/grupo/entities/grupo.entity';
import { Actividad } from 'src/actividad/entities/actividad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Puntuacion,Grupo, Actividad])],
  controllers: [PuntuacionController],
  providers: [PuntuacionService],
})
export class PuntuacionModule {}
