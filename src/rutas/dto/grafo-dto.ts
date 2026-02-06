import { AristaDto } from './arista-dto';
import { NodoDto } from './nodo-dto';

export class GrafoDto {
  nodos: Record<number, NodoDto>;
  aristas: Record<number, AristaDto[]>;
}
