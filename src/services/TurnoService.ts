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

export const createTurno = async (turnoData: CreateTurnoDTO): Promise<Turno> => {
  try {
    const response = await axios.post<Turno>(
      `${API_BASE_URL}/create-turno`,
      turnoData
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getTurnos = async (userId: string): Promise<Turno[]> => {
  try {
    const response = await axios.get<Turno[]>(`${API_BASE_URL}/turno/${userId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateTurno = async (turnoId: number, turnoData: UpdateTurnoDTO): Promise<void> => {
  try {
    await axios.put(
      `${API_BASE_URL}/update-turno/${turnoId}`,
      turnoData
    );
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteTurno = async (deleteData: DeleteTurnoDTO): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/remove-turno`, {
      data: deleteData
    });
  } catch (error) {
    handleApiError(error);
  }
};