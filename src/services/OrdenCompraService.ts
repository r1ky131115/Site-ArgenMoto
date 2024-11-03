import axios, { AxiosInstance } from 'axios';
import { OrdenCompraCreateData, OrdenCompraResponse, OrdenCompraUpdateEstado } from '../types/OrdenCompra';

const API_BASE_URL = 'https://localhost:7183/api';

class OrdenCompraService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Interceptor para manejar errores de manera global
        this.api.interceptors.response.use(
            response => response,
            error => {
                if (error.response) {
                    // El servidor respondió con un código de estado fuera del rango 2xx
                    throw new Error(error.response.data.message || 'Error en la operación de orden de compra');
                } else if (error.request) {
                    // La solicitud se realizó pero no se recibió respuesta
                    throw new Error('No se pudo conectar con el servidor');
                } else {
                    // Ocurrió un error al configurar la solicitud
                    throw new Error('Error al procesar la solicitud');
                }
            }
        );
    }

    async createOrdenCompra(data: OrdenCompraCreateData): Promise<OrdenCompraResponse> {
        const response = await this.api.post<OrdenCompraResponse>('/OrdenesCompra', data);
        return response.data;
    }

    async getAllOrdenesCompra(): Promise<OrdenCompraResponse[]> {
        const response = await this.api.get<OrdenCompraResponse[]>('/OrdenesCompra');
        return response.data;
    }

    async getOrdenCompraById(id: number): Promise<OrdenCompraResponse> {
        const response = await this.api.get<OrdenCompraResponse>(`/OrdenesCompra/${id}`);
        return response.data;
    }

    async updateOrdenCompra(data: OrdenCompraUpdateEstado): Promise<void> {
        await this.api.put('/OrdenesCompra/', data);
    }

    async deleteOrdenCompra(id: number): Promise<void> {
        await this.api.delete(`/OrdenesCompra/${id}`);
    }
}

export const ordenCompraService = new OrdenCompraService();