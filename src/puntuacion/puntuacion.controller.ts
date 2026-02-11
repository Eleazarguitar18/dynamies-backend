import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PuntuacionService } from './puntuacion.service';
import { CreatePuntuacionDto } from './dto/create-puntuacion.dto';
import { UpdatePuntuacionDto } from './dto/update-puntuacion.dto';

@Controller('puntuacion')
export class PuntuacionController {
  constructor(private readonly puntuacionService: PuntuacionService) {}

  @Post()
  create(@Body() createPuntuacionDto: CreatePuntuacionDto) {
    return this.puntuacionService.create(createPuntuacionDto);
  }

  @Get()
  findAll() {
    return this.puntuacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.puntuacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePuntuacionDto: UpdatePuntuacionDto) {
    return this.puntuacionService.update(+id, updatePuntuacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.puntuacionService.remove(+id);
  }
}
