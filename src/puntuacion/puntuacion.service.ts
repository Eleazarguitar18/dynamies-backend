import { Injectable } from '@nestjs/common';
import { CreatePuntuacionDto } from './dto/create-puntuacion.dto';
import { UpdatePuntuacionDto } from './dto/update-puntuacion.dto';

@Injectable()
export class PuntuacionService {
  create(createPuntuacionDto: CreatePuntuacionDto) {
    return 'This action adds a new puntuacion';
  }

  findAll() {
    return `This action returns all puntuacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} puntuacion`;
  }

  update(id: number, updatePuntuacionDto: UpdatePuntuacionDto) {
    return `This action updates a #${id} puntuacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} puntuacion`;
  }
}
