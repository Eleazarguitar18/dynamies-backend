import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { PersonaService } from 'src/persona/persona.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { Persona } from 'src/persona/entities/persona.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private userRepository: Repository<Usuario>,
    @InjectRepository(Persona)
        private personaRepository: Repository<Persona>,
        private readonly personaService: PersonaService,
        private readonly configService: ConfigService,
        private jwtService: JwtService,
  ) {}

  
  async create(createAuthDto: CreateAuthDto) {
    //  const emailUnique= await this.userRepository.findOne({
    //   where:{email:createAuthDto.email}
    // });
    // if(emailUnique){
    //   throw new UnauthorizedException('El email ya se encuentra registrado');
    // }

    // const ciUnique= await this.personaRepository.findOne({
    //   where:{ci:createAuthDto.ci}
    // });
    // if(ciUnique){
    //   throw new UnauthorizedException('El ci ya se encuentra registrado');
    // }
   // 1. Creas la persona (esto ya lo tienes y está bien)
    const persona = await this.personaService.create(createAuthDto);

    // 2. Generación de contraseña hash
    const password_hash = await this.encriptar_password(createAuthDto.password);

    // 3. Definir el ID del Rol
    // Si el DTO trae un id_role úsalo, si no, asígnale el 3 (que según nuestro seed es 'user')
    const rolId = createAuthDto.id_role || 3;
    const userDto = {
      name:
        createAuthDto.nombres +
        ' ' +
        createAuthDto.p_apellido +
        ' ' +
        createAuthDto.s_apellido,
      email: createAuthDto.email,
      password: password_hash,
      estado: createAuthDto.estado,
      persona: persona,
      // 4. IMPORTANTE: Agregamos la relación al objeto
      role: { id: rolId }
    };
   

    const user = this.userRepository.create(userDto);
    const data = await this.userRepository.save(user);
    // Opcional: Eliminar el password de la respuesta por seguridad
    // delete (data as any).password; // TypeScript ya no se queja
    return data;
  }

  async encriptar_password(password: string): Promise<string> {
    const saltRounds = parseInt(
      this.configService.get<string>('SALT_ROUNDS') ?? '10',
      10,
    );
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  }

  async findAll() {
    const data = await this.userRepository.find();
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
