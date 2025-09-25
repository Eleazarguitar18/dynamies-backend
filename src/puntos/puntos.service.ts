import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePuntoDto } from './dto/create-punto.dto';
import { UpdatePuntoDto } from './dto/update-punto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Punto } from './entities/punto.entity';

@Injectable()
export class PuntosService {
  constructor(
    @InjectRepository(Punto)
    private puntosRepository: Repository<Punto>,
  ) {}
  async create(createPuntoDto: CreatePuntoDto) {
    const punto = this.puntosRepository.create(createPuntoDto);
    return await this.puntosRepository.save(punto);
  }

  async findAll() {
    const data = await this.puntosRepository.find();
    if (data.length === 0) {
      throw new NotFoundException(`No existen datos de puntos`);
    }
    return data;
  }

  async findOne(id: number) {
    const data = await this.puntosRepository.findOneBy({ id: id });
    if (!data) {
      throw new NotFoundException(`No se encontro el registro del punto`);
    }
    return data;
  }

  update(id: number, updatePuntoDto: UpdatePuntoDto) {
    return `This action updates a #${id} punto`;
  }

  remove(id: number) {
    return `This action removes a #${id} punto`;
  }
}
