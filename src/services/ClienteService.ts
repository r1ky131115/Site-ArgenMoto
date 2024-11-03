import axios from 'axios';
import { ClienteData } from '../types/Cliente';

const API_BASE_URL = 'https://localhost:7183/api/Clientes';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const handleApiError = (error: any): never => {
  if (error.response) {
    throw new Error(error.response.data.mensaje || 'Error en la operación del turno');
  } else if (error.request) {
    throw new Error('Error al intentar conectarse con el servidor');
  } else {
    throw new Error('Error al intentar procesar la solicitud');
  }
};

export const ClienteService = {
  getCliente: async (id: string): Promise<ClienteData | undefined> => {
    try {
      const response = await api.get<ClienteData>(`/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  updateCliente: async (id: string, cliente: ClienteData): Promise<ClienteData | undefined> => {
    try {
      const response = await api.patch<ClienteData>(`/${id}`, cliente );
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },
}