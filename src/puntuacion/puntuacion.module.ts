import { Module } from '@nestjs/common';
import { PuntuacionService } from './puntuacion.service';
import { PuntuacionController } from './puntuacion.controller';
import { Puntuacion } from './entities/puntuacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Puntuacion])],
  controllers: [PuntuacionController],
  providers: [PuntuacionService],
})
export class PuntuacionModule {}
