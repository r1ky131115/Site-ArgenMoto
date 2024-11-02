import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/User';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  clienteId: string | null;  // Añadido clienteId específicamente
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [clienteId, setClienteId] = useState<string | null>(null);
  const [role, setUserRole] = useState<string | null>(null);

  const validateToken = (token: string | null): boolean => {
    if (!token) return false;
    
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return false;
      const payload = JSON.parse(atob(parts[1]));
      
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
    setIsAuthenticated(false);
    setUser(null);
    setClienteId(null);
    setUserRole(null);
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('usuario');
    const cliente = localStorage.getItem('cliente');
    const role = localStorage.getItem('role');

    console.log('Token en localStorage:', token);
    console.log('Usuario en localStorage:', JSON.stringify(user));
    console.log('Cliente en localStorage:', cliente);
    console.log('Role en localStorage:', role);

    if (token && user && role && cliente) {
      const isValidToken = validateToken(token);
      console.log('¿Token válido?:', isValidToken);
      if (isValidToken) {
        setIsAuthenticated(true);
        setUser(JSON.parse(user));
        setClienteId(cliente);
        setUserRole(role);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        localStorage.removeItem('cliente');
        localStorage.removeItem('role');
      }
    }
  }, []);

  const login = (token: string, user: User) => {
    console.log('Login ejecutado con token:', token, ', usuario:', user.id, ', cliente:', user.cliente_Id, ' y role:', user.rol);
    const { rol, cliente_Id } = user;

    if (!token || !rol || !cliente_Id) {
      console.error('Intento de login sin token o role');
      return;
    }

    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(user));
    localStorage.setItem('cliente', cliente_Id);
    localStorage.setItem('role', rol);
    
    setIsAuthenticated(true);
    setUser(user);
    setClienteId(cliente_Id);
    setUserRole(rol);
  };

  const logout = () => {
    console.log('Logout ejecutado');
    
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('cliente');
    localStorage.removeItem('role');
    
    setIsAuthenticated(false);
    setUser(null);
    setClienteId(null);
    setUserRole(null);
  };

  useEffect(() => {
    console.log('Estado de autenticación actualizado:', {
      isAuthenticated,
      user,
      clienteId,
      role
    });
  }, [isAuthenticated, user, clienteId, role]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, clienteId, login, logout }}>
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