import { OrdenCompraDetalle } from "./OrdenDetail";

export interface OrdenCompraData {
        idProveedor: number;
        razonSocial: string;
        domicilio: string | undefined;
        localidad: string | undefined;
        provincia: string | undefined;
        fecha: string;
        precioTotal: number;
        precioReal: number;
        estado: string;
        ordenCompraDetalles: OrdenCompraDetalle[];
}

export interface OrdenCompraCreateData {
        idProveedor: number;
        razonSocial: string;
        domicilio?: string;
        localidad?: string;
        provincia?: string;
        fecha: string;
        precioTotal: number;
        precioReal: number;
        estado: string;
        ordenCompraDetalles: OrdenCompraDetalle[];
    }

export interface OrdenCompraResponse {
        id: number;
        numero: string;
        fecha: string;
        razonSocial: string;
        precioTotal: number;
        estado: string;
        detalles: {
            idArticulo: number;
            codigoArticulo: string;
            descripcionArticulo: string;
            cantidad: number;
            precio: number;
            subtotal: number;
        }[];
    }

export interface OrdenCompraUpdateEstado{
    id: number;
    estado: string;
}