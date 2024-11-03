import { Articulo } from "./ArticleProps";

export interface OrderDetail {
    idArticulo: number;
    articulo: Articulo;
    cantidad: number;
    precio: number;
    subtotal: number;
  }

  export interface OrdenCompraDetalle {
    idArticulo: number;
    cantidad: number;
    precio: number;
  }