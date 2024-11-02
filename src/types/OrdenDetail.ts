import { Articulo } from "./ArticleProps";

export interface OrderDetail {
    idArticulo: number;
    articulo: Articulo;
    cantidad: number;
    precio: number;
    subtotal: number;
  }