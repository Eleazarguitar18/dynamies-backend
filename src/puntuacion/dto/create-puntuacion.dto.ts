import { IsNumber, IsString, IsNotEmpty, IsOptional, IsUrl, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePuntuacionDto {
  @ApiProperty({ example: 100, description: 'Cantidad de puntos (pueden ser negativos para penalizaciones)' })
  @IsNumber()
  monto: number;

  @ApiProperty({ example: 'Ganadores del primer lugar', description: 'Por qué se dan los puntos' })
  @IsString()
  @IsNotEmpty()
  motivo: string;

  @ApiProperty({ example: 1, description: 'ID del grupo que recibe los puntos' })
  @IsNumber()
  id_grupo: number;

  @ApiProperty({ example: 1, description: 'ID de la actividad realizada', required: false })
  @IsNumber()
  @IsOptional()
  id_actividad?: number;

  @ApiProperty({ example: 'https://foto-evidencia.com/123.jpg', required: false })
  @IsUrl()
  @IsOptional()
  url_evidencia?: string;
}