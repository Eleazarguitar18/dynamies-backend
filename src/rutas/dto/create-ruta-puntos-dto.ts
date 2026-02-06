import { Linea } from 'src/lineas/entities/linea.entity';
import { PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';
import { Punto } from 'src/puntos/entities/punto.entity';
import { CreatePuntoDto } from 'src/puntos/dto/create-punto.dto';
import { Ruta } from '../entities/ruta.entity';

export class CreateRutaPuntosDto {
  @IsNotEmpty()
  ruta: Ruta;
  @IsNotEmpty()
  punto: Punto;
  @IsNumber()
  orden: number;
  // NUEVO CAMPO: Agrégalo aquí para que no te dé error al guardar
  @IsOptional()
  @IsNumber()
  distancia_siguiente?: number;
}
export class UpdateCustomerDto extends PartialType(CreateRutaPuntosDto) {}
