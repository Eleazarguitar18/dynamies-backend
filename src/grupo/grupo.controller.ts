import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { GrupoService } from './grupo.service';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('grupo')
@Controller('grupo')
export class GrupoController {
  constructor(private readonly grupoService: GrupoService) {}

  @Post()
  @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard) // Actívalo cuando quieras proteger la ruta
  @ApiOperation({ summary: 'Crea un nuevo grupo de campamento' })
  async create(@Body() createGrupoDto: CreateGrupoDto, @Request() req) {
    // Si el JWT está activo, sacamos el ID del usuario de la petición
    // Si no, mandamos un 1 por defecto mientras pruebas

    const userId = req.user?.id || 1;
    console.log('ID del usuario que crea el grupo:', userId);
    return await this.grupoService.create(createGrupoDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene la lista de todos los grupos activos' })
  async findAll() {
    return await this.grupoService.findAll();
  }
  @Get('ranking')
  @ApiOperation({ summary: 'Obtiene el ranking de grupos por puntuación' })
  async getRanking() {
    return await this.grupoService.getRanking();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.grupoService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Reemplaza o actualiza un grupo existente' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGrupoDto: UpdateGrupoDto,
    @Request() req,
  ) {
    // Mantenemos el fallback por si no hay JWT activo aún
    const userId = req.user?.id || 1;
    return await this.grupoService.update(id, updateGrupoDto, userId);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminación lógica de un grupo (cambia estado a false)',
  })
  async remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const userId = req.user?.id || 1; // Fallback por si no hay JWT
    return await this.grupoService.remove(id, userId);
  }

  @Patch(':id/restore')
  @ApiOperation({ summary: 'Restaura un grupo que fue eliminado lógicamente' })
  async restore(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const userId = req.user?.id || 1;
    return await this.grupoService.restore(id, userId);
  }
  @Get('deleted')
  @ApiOperation({
    summary: 'Lista todos los grupos que han sido eliminados lógicamente',
  })
  async findAllDeleted() {
    return await this.grupoService.findAllDeleted();
  }
}
