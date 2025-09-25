import { Module } from '@nestjs/common';
import { LineasService } from './lineas.service';
import { LineasController } from './lineas.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Linea } from './entities/linea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Linea])],
  controllers: [LineasController],
  providers: [LineasService],
  exports: [LineasService],
})

export class LineasModule {}
