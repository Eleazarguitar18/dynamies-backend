import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PersonaService } from 'src/persona/persona.service';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { hash } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/SingInDto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private userRepository: Repository<Usuario>,
    private readonly personaService: PersonaService,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}
  async create(createAuthDto: CreateAuthDto) {
    const persona = await this.personaService.create(createAuthDto);

    // generaciond de contraseña
    const password_hash = await this.encriptar_password(createAuthDto.password);
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
    };

    const user = this.userRepository.create(userDto);
    const data = await this.userRepository.save(user);
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

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
  async login(email: string, password: string): Promise<SignInDto | null> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['persona'],
    });
    if (!user) {
      return null;
    }
    const isPasswordValid = await this.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return null;
    }
    const payload = { sub: user.id, username: user.name };
    const access_token = await this.jwtService.signAsync(payload);
    return {
      "access_token":access_token,
      "user":user,
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
