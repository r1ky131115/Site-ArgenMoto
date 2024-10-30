// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { isAuthenticated } from '../services/UserAPI';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(isAuthenticated());
    };

    // Verificar el estado de autenticación cuando cambie el almacenamiento local
    window.addEventListener('storage', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  return { isLoggedIn };
};