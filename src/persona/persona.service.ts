import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Persona } from './entities/persona.entity';

@Injectable()
export class PersonaService {

  constructor(
    @InjectRepository(Persona)
    private personaRepository: Repository<Persona>,
  ) {}
  async create(createPersonaDto: CreatePersonaDto) {
    // const {...personaData}=createPersonaDto;
    const persona = this.personaRepository.create(createPersonaDto);
    const personaData = await this.personaRepository.save(persona);
    return personaData;
  }

  async findAll() {
    const data = await this.personaRepository.find();
    if (data.length === 0) {
      throw new NotFoundException(`No existen datos de personass`);
    }
    return data;
  }
  async findOne(id: number) {
    const data = await this.personaRepository.findOneBy({ id: id });
    if (!data) {
      throw new NotFoundException(`No existen datos de la persona`);
    }
    return data;
  }
  async buscar_por_ci(ci: string) {
    const data = await this.personaRepository.findOneBy({ ci: ci });
    if (!data) {
      throw new NotFoundException(`No existen datos de la persona con el seguiente ci: ${ci}`);
    }
    return data;
  }

  update(id: number, updatePersonaDto: UpdatePersonaDto) {
    return `This action updates a #${id} persona`;
  }

  remove(id: number) {
    return `This action removes a #${id} persona`;
  }
}
