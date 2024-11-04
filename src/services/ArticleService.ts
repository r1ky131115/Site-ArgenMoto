import axios from 'axios';
import { ArticleProps, Articulo, newArticulo } from '../types/ArticleProps';

const API_BASE_URL = 'https://localhost:7183/api/Articulos';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const handleApiError = (error: any): never => {
  if (error.response) {
    throw new Error(error.response.data.mensaje || 'Error al obtener artículos');
  } else if (error.request) {
    throw new Error('Error al intentar conectarse con el servidor');
  } else {
    throw new Error('Error al intentar procesar la solicitud');
  }
};

const ArticleService = {
  
  getArticles: async (): Promise<ArticleProps[]> => {
    try {
      const response = await api.get<ArticleProps[]>(`/articulos`);
      return response.data;
    } catch (error: any) {
      return handleApiError(error);
    }
  },
  
  getBasicArticles: async (): Promise<Articulo[]> => {
    try {
      const response = await api.get<Articulo[]>(`/articulos`);
      return response.data;
    } catch (error: any) {
      return handleApiError(error);
    }
  },
  
  GetArticlesPorProveedor: async (id: number): Promise<Articulo[]> => {
    try {
      const response = await api.get<Articulo[]>(`/proveedor/${id}`);
      return response.data;
    } catch (error: any) {
      return handleApiError(error);
    }
  },

  CreateArticles: async (article: newArticulo): Promise<void> => {
    try {
      const response = await api.post('', article);
      return response.data;
    } catch (error: any) {
      return handleApiError(error);
    }
  },
}

export default ArticleService;

