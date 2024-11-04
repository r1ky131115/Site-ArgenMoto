export interface ArticleProps {
    id: number;
    codigo: string;
    descripcion: string;
    precio: number;
    marca: string;
    modelo: string;
    año: number;
    cilindrada: string;
  }

export interface Articulo {
  id: number;
  codigo: string;
  descripcion: string;
  marca: string;
  modelo: string;
}

export interface Articulo {
  id: number;
  codigo: string;
  descripcion: string;
  precio: number;
  marca: string;
  modelo: string;
  stockActual?: number;
  idProveedor?: number;
}

export interface newArticulo {
  idProveedor?: number;
  marca: string;
  modelo: string;
  descripcion: string;
  precio: number;
  stockActual?: number;
  nroMotor?: number;
  nroChasis?: number;
  año?: number;
  cilindrada?: string;
}