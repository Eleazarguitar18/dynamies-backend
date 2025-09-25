import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLineaDto } from './dto/create-linea.dto';
import { UpdateLineaDto } from './dto/update-linea.dto';
import { Repository } from 'typeorm';
import { Linea } from './entities/linea.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LineasService {
  constructor(
    @InjectRepository(Linea)
    private lineasRepository: Repository<Linea>) {}
  async create(createLineaDto: CreateLineaDto) {
    const linea = this.lineasRepository.create(createLineaDto);
    return await this.lineasRepository.save(linea);
  }

  async findAll() {
    const data = await this.lineasRepository.find();
    if (data.length === 0) {
      throw new NotFoundException(`No existen datos de lineas`);
    }
    return data;
  }

  async findOne(id: number) {
    const data = await this.lineasRepository.findOneBy({ id: id });
    if (!data) {
      throw new NotFoundException(`No existen datos de la linea`);
    }
    return data;
  }

  update(id: number, updateLineaDto: UpdateLineaDto) {
    return `This action updates a #${id} linea`;
  }

  remove(id: number) {
    return `This action removes a #${id} linea`;
  }
}
