import { Module } from '@nestjs/common';
import { PuntosService } from './puntos.service';
import { PuntosController } from './puntos.controller';
import { Type } from 'class-transformer';
import { Punto } from './entities/punto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Punto])],
  controllers: [PuntosController],
  providers: [PuntosService],
  exports: [PuntosService],
})
export class PuntosModule {}
