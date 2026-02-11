import { Controller, Post, Body, Get, Param, Request, ParseIntPipe } from '@nestjs/common';
import { PuntuacionService } from './puntuacion.service';
import { CreatePuntuacionDto } from './dto/create-puntuacion.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('puntuacion')
@Controller('puntuacion')
export class PuntuacionController {
  constructor(private readonly puntuacionService: PuntuacionService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar nuevos puntos para un grupo' })
  async create(@Body() dto: CreatePuntuacionDto, @Request() req) {
    // console.log('Creando puntuación con DTO:', dto, 'Usuario ID:', req.user?.id);
    const puntaje=await this.puntuacionService.create(dto, req.user?.id || 1);
    return puntaje;
  }

  @Get('grupo/:id')
  @ApiOperation({ summary: 'Ver historial de puntos de un grupo específico' })
  findAllByGrupo(@Param('id', ParseIntPipe) id: number) {
    return this.puntuacionService.findAllByGrupo(id);
  }
}