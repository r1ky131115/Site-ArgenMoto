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
    numeroTurno: string;
  }

export interface CreateTurnoDTO {
  idCliente: number;
  idArticulo: number;
  idTecnico: number;
  fecha: string;
  hora: string;
  estado: string;
  numeroTurno: string;
}

export interface UpdateTurnoDTO {
  id: number;
  fecha: string;
  hora: string;
  estado: string;
  idCliente: number;
  idArticulo: number;
  idTecnico: number;
  numeroTurno: string;
}

export interface DeleteTurnoDTO {
  cliente_Id: number;
  turno_Id: number;
}

export type TurnoEstado = 'Pendiente' | 'Finalizado';