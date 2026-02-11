import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateActividadDto {
  @ApiProperty({ example: 'Rally Nocturno', description: 'Nombre de la actividad' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'Carrera de obstáculos en el bosque', required: false })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({ example: 100, description: 'Puntos que otorga esta actividad por defecto' })
  @IsNumber()
  @Min(0)
  puntos_base: number;

  @ApiProperty({ example: 'Deportes', description: 'Categoría de la actividad', required: false })
  @IsString()
  @IsOptional()
  categoria?: string;
}

export class UpdateActividadDto extends PartialType(CreateActividadDto) {}