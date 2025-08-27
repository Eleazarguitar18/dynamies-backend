import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { PersonaService } from 'src/persona/persona.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
    private readonly personaService: PersonaService,
  ) {}

  
  // async create_old(createUsuarioDto: CreateUsuarioDto) {
  //   let persona = null;
  //   if (createUsuarioDto.id_persona) {
  //     const persona = await this.personaService.findOne(
  //       createUsuarioDto.id_persona,
  //     );
  //     if (!persona) throw new Error('Persona no encontrada');
  //   }
  //   const usuario = this.usuariosRepository.create(createUsuarioDto);
  //   const usuarioData = await this.usuariosRepository.save(usuario);
  //   return usuarioData;
  // }

  async findAll() {
    const data = await this.usuariosRepository.find();
    if (data.length === 0) {
      throw new NotFoundException(`No existen datos de usuarios`);
    }
    return data;
  }

  findOne(id: number) {
    
    return `This action returns a #${id} usuario`;
  }

  // updates
  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
