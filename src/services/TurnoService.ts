import axios from 'axios';
import { Turno, CreateTurnoDTO, UpdateTurnoDTO, DeleteTurnoDTO } from '../types/Turno';

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

const TurnoService = {
  createTurno: async (turnoData: CreateTurnoDTO): Promise<Turno | undefined> => {
    try {
      const response = await api.post<Turno>(`${API_BASE_URL}/create-turno`, turnoData);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  getTurnos: async (userId: string): Promise<Turno[]> => {
    try {
      const response = await api.get<Turno[]>(`${API_BASE_URL}/turno/${userId}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
      return []; // Devuelve un array vacío si hay un error
    }
  },

  getAllTurnos: async (): Promise<Turno[]> => {
    try {
      const response = await api.get<Turno[]>(`${API_BASE_URL}/turnos`);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  updateTurnoData: async (turnoId: number, turnoData: UpdateTurnoDTO): Promise<void> => {
    try {
      await api.put(`${API_BASE_URL}/update-turno/${turnoId}`, turnoData);
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  updateTurnoEstado: async (turnoId: number): Promise<Turno []> => {
    try {
      const response = await api.put<Turno[]>(`${API_BASE_URL}/update-turno-estado/${turnoId}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  deleteTurno: async (deleteData: DeleteTurnoDTO): Promise<void> => {
    try {
      await api.delete(`${API_BASE_URL}/remove-turno`, { data: deleteData });
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  deleteTurnoForAdmin: async (id: number): Promise<void> => {
    try {
      await api.delete(`${API_BASE_URL}/remove-turno-for-admin/${id}`);
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  }
};

export default TurnoService;
