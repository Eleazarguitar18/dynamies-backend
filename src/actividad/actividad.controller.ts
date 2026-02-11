import { Controller, Get, Post, Body, Put, Param, Delete, Patch, Request, ParseIntPipe } from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { CreateActividadDto, UpdateActividadDto } from './dto/create-actividad.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('actividad')
@Controller('actividad')
export class ActividadController {
  constructor(private readonly actividadService: ActividadService) {}

  @Post()
  @ApiOperation({ summary: 'Crear actividad' })
  create(@Body() dto: CreateActividadDto, @Request() req) {
    return this.actividadService.create(dto, req.user?.id || 1);
  }

  @Get()
  @ApiOperation({ summary: 'Listar actividades activas' })
  findAll() {
    return this.actividadService.findAll();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar actividad' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateActividadDto, @Request() req) {
    return this.actividadService.update(id, dto, req.user?.id || 1);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Borrado lógico' })
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.actividadService.remove(id, req.user?.id || 1);
  }

  @Patch(':id/restore')
  @ApiOperation({ summary: 'Restaurar actividad' })
  restore(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.actividadService.restore(id, req.user?.id || 1);
  }
}