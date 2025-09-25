import { PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePuntoDto {
  @IsString()
  nombre: string;
  @IsString()
  tipo: string;
  @IsString()
  latitud: string;
  @IsString()
  longitud: string;
  estado: boolean = true;
  id_user_create: number;
  id_user_update?: number;
}

export class UpdateCustomerDto extends PartialType(CreatePuntoDto) {}
