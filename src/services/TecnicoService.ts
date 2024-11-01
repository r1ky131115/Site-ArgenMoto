import axios from 'axios';
import { Tecnico } from '../types/Tecnico';

const API_BASE_URL = 'https://localhost:7183/api/Tecnicos';

export const getTecnicos = async (): Promise<Tecnico[]> => {
  try {
    const response = await axios.get<Tecnico[]>(`${API_BASE_URL}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.mensaje || 'Error al obtener Tecnico');
    } else if (error.request) {
      throw new Error('Error al intentar conectarse con el servidor');
    } else {
      throw new Error('Error al intentar procesar la solicitud');
    }
  }
};
