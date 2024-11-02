import axios from 'axios';
import { CreateUserDTO } from '../types/User';
import { LoginCredentials } from '../types/auth';

const API_BASE_URL = 'https://localhost:7183/api';

// Crear una instancia de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor de solicitudes
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Token incluido en la solicitud:', `Bearer ${token}`);
    } else {
      console.log('No hay token disponible');
    }
    return config;
  },
  error => {
    console.error('Error en el interceptor de solicitud:', error);
    return Promise.reject(error);
  }
);

// Interceptor de respuestas
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response?.status === 401) {
      // Token inválido o expirado
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      localStorage.removeItem('cliente');
      localStorage.removeItem('role');
      // Redirigir al login?
    }
    return Promise.reject(error);
  }
);

// Función de login mejorada
export const login = async (credentials: LoginCredentials) => {
  try {
    const response = await api.post('/Usuarios/login', credentials);
    const { token, usuario, cliente_Id, rol } = response.data;

    if (token && usuario && rol) {
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', usuario);
      localStorage.setItem('cliente', cliente_Id);
      localStorage.setItem('role', rol);

      // Establecer el token inmediatamente para la sesión actual
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log('Token almacenado:', token);
      console.log('Usuario almacenado:', usuario);
      console.log('Cliente almacenado:', cliente_Id);
      console.log('Rol almacenado:', rol);
    }

    return response.data;
  } catch (error: any) {
    console.error('Error en login:', error);
    throw handleError(error);
  }
};


export const createUser = async (userData: CreateUserDTO) => {
  try {
    const response = await api.post('/Usuarios/create-user', userData);
    return response.data;
  } catch (error: any) {
    console.error('Error en createUser:', error);
    throw handleError(error);
  }
};

// Función auxiliar para manejar errores
const handleError = (error: any) => {
  if (error.response) {
    // El servidor respondió con un estado de error
    return new Error(error.response.data.mensaje || 
      `Error ${error.response.status}: ${error.response.statusText}`);
  } else if (error.request) {
    // La solicitud se hizo pero no se recibió respuesta
    return new Error('No se pudo conectar con el servidor');
  } else {
    // Error en la configuración de la solicitud
    return new Error('Error al procesar la solicitud');
  }
};

// Función para verificar si hay un token válido
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

// Función para cerrar sesión
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  localStorage.removeItem('cliente');
  localStorage.removeItem('role');
  delete api.defaults.headers.common['Authorization'];
};

export default api;
