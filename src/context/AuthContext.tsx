import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  login: (token: string, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

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
    setUserRole(null);

    // Verificar token al cargar
    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('userRole');

    console.log('Token en localStorage:', token);
    console.log('Role en localStorage:', rol);

    if (token && rol) {
      const isValidToken = validateToken(token);
      console.log('¿Token válido?:', isValidToken);

      if (isValidToken) {
        setIsAuthenticated(true);
        setUserRole(rol);
      } else {
        // Si el token no es válido, limpiar todo
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
      }
    }
  }, []);

  const login = (token: string, rol: string) => {
    console.log('Login ejecutado con token:', token, 'y role:', rol);
    
    if (!token || !rol) {
      console.error('Intento de login sin token o role');
      return;
    }

    localStorage.setItem('token', token);
    localStorage.setItem('userRole', rol);
    
    setIsAuthenticated(true);
    setUserRole(rol);
  };

  const logout = () => {
    console.log('Logout ejecutado');
    
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  // Agregar un efecto para monitorear cambios en el estado de autenticación
  useEffect(() => {
    console.log('Estado de autenticación actualizado:', {
      isAuthenticated,
      userRole
    });
  }, [isAuthenticated, userRole]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
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