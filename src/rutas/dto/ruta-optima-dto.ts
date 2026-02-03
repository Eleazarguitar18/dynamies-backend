import { IsNumber } from 'class-validator';

export class RutaOptimaDto {
  @IsNumber()
  origenLat: number;

  @IsNumber()
  origenLng: number;

  @IsNumber()
  destinoLat: number;

  @IsNumber()
  destinoLng: number;
}
