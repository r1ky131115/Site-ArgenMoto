import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoginForm from '../../components/LoginForm/LoginForm';
import PageHeader from '../../components/Header/PageHeader';

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Si está autenticado, redirigir
  if (isAuthenticated) {
    // Obtener la ruta de redirección del state, o usar /panel por defecto
    const from = location.state?.from || '/panel';
    return <Navigate to={from} replace />;
  }

  // Si no está autenticado, mostrar el formulario de login
  return (
    <>
      <PageHeader
        backgroundImage="/images/bg_3.jpg"
        title="Inicia Sesión"
      />
      <LoginForm />
    </>
  );
};

export default LoginPage;