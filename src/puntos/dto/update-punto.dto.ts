import { PartialType } from '@nestjs/swagger';
import { CreatePuntoDto } from './create-punto.dto';

export class UpdatePuntoDto extends PartialType(CreatePuntoDto) {}
