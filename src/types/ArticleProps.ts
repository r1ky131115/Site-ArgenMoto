export interface ArticleProps {
    id: number;
    codigo: string;
    descripcion: string;
    precio: number;
    marca: string;
    modelo: string;
    anio: number;
    cilindro: string;
    imageUrl: string;
  }

export interface Articulo {
  id: number;
  codigoArticulo: string;
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