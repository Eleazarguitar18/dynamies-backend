import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePuntoDto } from './dto/create-punto.dto';
import { UpdatePuntoDto } from './dto/update-punto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Punto } from './entities/punto.entity';
import { PuntoDto } from './dto/punto-dto';

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
  // async create_array(createPuntoDto: CreatePuntoDto[]) {

  //   const punto = this.puntosRepository.create(createPuntoDto);
  //   return await this.puntosRepository.save(punto);
  // }

  distancia_entre_puntos(punto1: PuntoDto, punto2: PuntoDto): number {
    const lat1 = punto1.latitud;
    const lon1 = punto1.longitud;
    const lat2 = punto2.latitud;
    const lon2 = punto2.longitud;

    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanciaKm = R * c; // en kilómetros

    // Redondear a 2 decimales
    //return Number(distanciaKm.toFixed(2));

    // O truncar a 2 decimales sin redondear
    return Math.floor(distanciaKm * 100) / 100;
  }

  // Función auxiliar para convertir grados a radianes
  toRad(value: number): number {
    return (value * Math.PI) / 180;
  }

  puntos_cercanos() {}
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
