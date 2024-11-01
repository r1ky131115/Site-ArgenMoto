import axios from 'axios';
import { Turno, CreateTurnoDTO, UpdateTurnoDTO, DeleteTurnoDTO } from '../types/Turno';

const API_BASE_URL = 'https://localhost:7183/api/Clientes';

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
      const response = await axios.post<Turno>(`${API_BASE_URL}/create-turno`, turnoData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  getTurnos: async (userId: string): Promise<Turno[]> => {
    try {
      const response = await axios.get<Turno[]>(`${API_BASE_URL}/turno/${userId}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
      return []; // Devuelve un array vacío si hay un error
    }
  },

  getAllTurnos: async (): Promise<Turno[]> => {
      try {
      const response = await axios.get<Turno[]>(`${API_BASE_URL}/turnos`);
      return response.data;
    } catch (error) {
      console.error('Error fetching turnos:', error);
      throw error;
    }
  },

  updateTurnoData: async (turnoId: number, turnoData: UpdateTurnoDTO): Promise<void> => {
    try {
      await axios.put(`${API_BASE_URL}/update-turno/${turnoId}`, turnoData);
    } catch (error) {
      handleApiError(error);
    }
  },

  updateTurnoEstado: async (id: number, estado: string): Promise<Turno | undefined> => {
    try {
      const response = await axios.patch<Turno>(`${API_BASE_URL}/update-turno-estado/${id}`, { estado });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  deleteTurno: async (deleteData: DeleteTurnoDTO): Promise<void> => {
    try {
      await axios.delete(`${API_BASE_URL}/remove-turno`, { data: deleteData });
    } catch (error) {
      handleApiError(error);
    }
  },

  deleteTurnoForAdmin: async (id: number): Promise<void> => {
    try {
      await axios.delete(`${API_BASE_URL}/remove-turno-for-admin/${id}`);
    } catch (error) {
      handleApiError(error);
    }
  }
};

export default TurnoService;
