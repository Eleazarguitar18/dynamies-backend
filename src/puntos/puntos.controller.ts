import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { PuntosService } from './puntos.service';
import { CreatePuntoDto } from './dto/create-punto.dto';
import { UpdatePuntoDto } from './dto/update-punto.dto';
import { PuntoDto } from './dto/punto-dto';
import { DistanciaDto } from './dto/distancia-dto';

@Controller('puntos')
export class PuntosController {
  constructor(private readonly puntosService: PuntosService) {}

  @Post('create')
  async create(@Body() createPuntoDto: CreatePuntoDto) {
    return await this.puntosService.create(createPuntoDto);
  }
  @Post('distancia')
  async distancia(@Body() body: DistanciaDto) {
    try {
      const { punto1, punto2 } = body;

      console.log('Punto1:', punto1);
      console.log('Punto2:', punto2);

      return await this.puntosService.distancia_entre_puntos(punto1, punto2);
    } catch (error) {
      console.error('Error real de DB:', error);
      throw new HttpException(
        {
          statusCode: 409,
          message: 'Error de base de datos',
          detail: error.message, // ahora verás el mensaje real
        },
        409,
      );
    }
  }
  @Post('cercanos')
  async tresPuntosMasCercanos(@Body() body: PuntoDto) {
    // console.log('Punto de referencia:', body);
    return await this.puntosService.tresPuntosMasCercanos(body);
  }

  @Get('listar')
  async findAll() {
    return await this.puntosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.puntosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePuntoDto: UpdatePuntoDto) {
    return this.puntosService.update(+id, updatePuntoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.puntosService.remove(+id);
  }
}
