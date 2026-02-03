import { AristaDto } from './arista-dto';
import { NodoDto } from './nodo-dto';

export class GrafoDto {
  nodos: Map<number, NodoDto>;
  aristas: Map<number, AristaDto[]>;
}
