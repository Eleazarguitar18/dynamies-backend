import { PartialType } from '@nestjs/swagger';
import { CreatePuntuacionDto } from './create-puntuacion.dto';

export class UpdatePuntuacionDto extends PartialType(CreatePuntuacionDto) {}
