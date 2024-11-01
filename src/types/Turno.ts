import { Articulo } from "./ArticleProps";
import { Cliente } from "./Cliente";
import { Tecnico } from "./Tecnico";

export interface Turno {
    id: number;
    cliente: Cliente;
    articulo: Articulo;
    tecnico: Tecnico;
    fecha: string;
    hora: string;
    estado: string;
  }

export interface CreateTurnoDTO {
  idCliente: number;
  idArticulo: number;
  idTecnico: number;
  fecha: string;
  hora: string;
  estado: string;
}

export interface UpdateTurnoDTO {
  id: number;
  fecha: string;
  hora: string;
  estado: string;
  idCliente: number;
  idArticulo: number;
  idTecnico: number;
}

export interface DeleteTurnoDTO {
  cliente_Id: number;
  turno_Id: number;
}

export type TurnoEstado = 'Pendiente' | 'Finalizado';