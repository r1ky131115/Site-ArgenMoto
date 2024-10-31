import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  element: React.ReactElement;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  element, 
  allowedRoles = [] 
}) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated) {
    // Usar el pathname actual para la redirección posterior
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Si está autenticado pero no tiene el rol adecuado
  if (allowedRoles.length > 0 && (!user?.rol || !allowedRoles.includes(user.rol))) {
    // Redirigir al home sin usar state
    return <Navigate to="/" replace />;
  }

  // Si todo está bien, mostrar el elemento
  return element;
};

export default ProtectedRoute;