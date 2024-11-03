export interface ArticleProps {
    id: number;
    codigo: string;
    descripcion: string;
    precio: number;
    marca: string;
    modelo: string;
    anio: number;
    cilindro: string;
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
  descripcion: string;
  stockActual?: number;
  precio: number;
  marca: string;
  modelo: string;
  año?: number;
  cilindro?: string;
}