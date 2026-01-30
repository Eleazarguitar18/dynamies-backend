import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePuntoDto {
  @IsString()
  nombre: string;
  @IsString()
  tipo: string;
  @IsNumber()
  latitud: number;
  @IsNumber()
  longitud: number;
  estado: boolean = true;
  id_user_create: number;
  id_user_update?: number;
}

export class UpdateCustomerDto extends PartialType(CreatePuntoDto) {}
