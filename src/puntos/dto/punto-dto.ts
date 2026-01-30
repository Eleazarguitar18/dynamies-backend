import { Type } from 'class-transformer';
import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class PuntoDto {
  @IsString()
  nombre: string;

  @IsString()
  tipo: string; // esquina, curva, etc.

  @IsNumber()
  @Type(() => Number)
  latitud: number;

  @IsNumber()
  @Type(() => Number)
  longitud: number;

  @IsOptional()
  @Type(() => Number)
  distancia_al_siguiente?: number; // puede ser null

  @IsNumber()
  orden: number;

  @IsNumber()
  id_user_create: number;
}
