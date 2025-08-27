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
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  // @Post()
  // async create(@Body() createUsuarioDto: CreateUsuarioDto) {
  //   try {
  //     const respuesta = await this.usuarioService.create(createUsuarioDto);
  //     const data = {
  //       status: 200,
  //       message: 'Se creo el usuario con exito!',
  //       data: respuesta,
  //     };
  //     return data;
  //   } catch (error) {
  //     throw new HttpException(
  //       {
  //         status: error.status || 500,
  //         message: error.message || 'Error al crear la persona',
  //         details: error.detail || null, // opcional, por ejemplo para errores de DB
  //       },
  //       error.status || 500,
  //     );
  //   }
  // }

  @Get()
  async findAll() {
    const respuesta = await this.usuarioService.findAll();
    const data = {
      status: 200,
      message: 'Listado de usuarios registradas!',
      data: respuesta,
    };
    return data;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
