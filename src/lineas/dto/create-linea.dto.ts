import { PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateLineaDto {
  @IsString()
  numero: string;
  @IsString()
  color: string;
  @IsString()
  descripcion: string;
  estado: boolean = true;
  id_user_create: number;
  id_user_update?: number;
}
export class UpdateCustomerDto extends PartialType(CreateLineaDto) {}
