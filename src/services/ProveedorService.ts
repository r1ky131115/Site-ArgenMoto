import axios from 'axios';
import { Proveedor } from '../types/Proveedor';

const API_BASE_URL = 'https://localhost:7183/api/Proveedor';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const handleApiError = (error: any): never => {
  if (error.response) {
    throw new Error(error.response.data.mensaje || 'Error en la operación del proveedor');
  } else if (error.request) {
    throw new Error('Error al intentar conectarse con el servidor');
  } else {
    throw new Error('Error al intentar procesar la solicitud');
  }
};

const ProveedorService = {
    getProveedores: async (): Promise<Proveedor[]> => {
        try {
          const response = await api.get<Proveedor[]>('');
          return response.data;
        } catch (error) {
          handleApiError(error);
          throw error;
        }
      },
}

export default ProveedorService;