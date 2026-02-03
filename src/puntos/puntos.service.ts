import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePuntoDto } from './dto/create-punto.dto';
import { UpdatePuntoDto } from './dto/update-punto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Punto } from './entities/punto.entity';
import { PuntoDto } from './dto/punto-dto';

@Injectable()
export class PuntosService {
  constructor(
    @InjectRepository(Punto)
    private puntosRepository: Repository<Punto>,
    private dataSource: DataSource,
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

  async tresPuntosMasCercanos(puntoRef: PuntoDto): Promise<PuntoDto[]> {
    console.log('Buscando puntos cercanos a:', puntoRef);

    const query = `
      SELECT nombre, tipo, latitud, longitud, 
              id_user_create,
              ROUND(
                (ST_Distance(
                  ST_SetSRID(ST_MakePoint(longitud, latitud), 4326)::geography,
                  ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography
                ) / 1000)::numeric, 2
              ) AS distancia_al_siguiente
        FROM punto
        WHERE nombre != $3
        ORDER BY distancia_al_siguiente
        LIMIT 3;
  `;

    console.log('Ejecutando consulta para puntos cercanos...');

    // CORRECCIÓN: primero longitud, luego latitud
    const resultados = await this.dataSource.query(query, [
      puntoRef.longitud, // $1 → lonRef
      puntoRef.latitud, // $2 → latRef
      puntoRef.nombre, // $3 → nombre del punto de referencia
    ]);

    console.log('Resultados obtenidos:', resultados);

    // Mapear resultados a PuntoDto y agregar orden
    return resultados.map((r, index) => ({
      nombre: r.nombre,
      tipo: r.tipo,
      latitud: parseFloat(r.latitud),
      longitud: parseFloat(r.longitud),
      distancia_al_siguiente: parseFloat(r.distancia_al_siguiente),
      orden: index + 1,
      id_user_create: r.id_user_create,
    }));
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
