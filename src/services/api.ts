import axios from 'axios';
import { CreateUserDTO } from '../types/User';

const API_BASE_URL = 'https://localhost:7183/api';

export const createUser = async (userData: CreateUserDTO) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Usuarios/create-user`, userData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.mensaje || 'Error al crear usuario');
    } else if (error.request) {
      throw new Error('Error al intentar conectarse con el servidor');
    } else {
      throw new Error('Error al intentar procesar la solicitud');
    }
  }
};