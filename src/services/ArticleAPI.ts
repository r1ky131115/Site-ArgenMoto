import axios from 'axios';
import { ArticleProps } from '../types/ArticleProps';

const API_BASE_URL = 'https://localhost:7183/api';

export const getArticles = async (): Promise<ArticleProps[]> => {
  try {
    const response = await axios.get<ArticleProps[]>(`${API_BASE_URL}/Articulos/articulos`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.mensaje || 'Error al obtener artículos');
    } else if (error.request) {
      throw new Error('Error al intentar conectarse con el servidor');
    } else {
      throw new Error('Error al intentar procesar la solicitud');
    }
  }
};
