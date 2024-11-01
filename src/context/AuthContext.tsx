import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/User';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [role, setUserRole] = useState<string | null>(null);

  // Función para validar el token
  const validateToken = (token: string | null): boolean => {
    if (!token) return false;
    
    try {
      // Verificar si el token tiene el formato correcto (por ejemplo, si es un JWT)
      const parts = token.split('.');
      if (parts.length !== 3) return false;

      // Decodificar el payload
      const payload = JSON.parse(atob(parts[1]));
      
      // Verificar si el token ha expirado
      if (payload.exp && Date.now() >= payload.exp * 1000) {
        console.log('Token expirado');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error validando token:', error);
      return false;
    }
  };

  useEffect(() => {
    // Limpiar cualquier estado de autenticación al montar el componente
    setIsAuthenticated(false);
    setUser(null);
    setUserRole(null);

    // Verificar token al cargar
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('usuario');
    const role = localStorage.getItem('role');

    console.log('Token en localStorage:', token);
    console.log('Usuario en localStorage:', JSON.stringify(user));
    console.log('Role en localStorage:', role);

    if (token && user && role) {
      const isValidToken = validateToken(token);
      console.log('¿Token válido?:', isValidToken);
      const parsedUser = JSON.parse(user);

      if (isValidToken) {
        setIsAuthenticated(true);
        setUser(parsedUser);
        setUserRole(role);
      } else {
        // Si el token no es válido, limpiar todo
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        localStorage.removeItem('role');
      }
    }
  }, []);

  const login = (token: string, user: User) => {
    console.log('Login ejecutado con token:', token, ', usuario', user.id ,' y role:', user.rol);
    const { rol } = user;

    if (!token || !rol) {
      console.error('Intento de login sin token o role');
      return;
    }

    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(user));
    localStorage.setItem('role', rol);
    
    setIsAuthenticated(true);
    setUser(user);
    setUserRole(rol);
  };

  const logout = () => {
    console.log('Logout ejecutado');
    
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setUser(null);
    setUserRole(null);
  };

  // Agregar un efecto para monitorear cambios en el estado de autenticación
  useEffect(() => {
    console.log('Estado de autenticación actualizado:', {
      isAuthenticated,
      user,
      role
    });
  }, [isAuthenticated, user, role]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};