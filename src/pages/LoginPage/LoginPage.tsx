import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import { LoginCredentials, AuthResponse } from '../../types/auth';
import PageHeader from '../../components/Header/PageHeader'; 

const LoginPage: React.FC = () => {
  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      // Simulación de una llamada a la API
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const data: AuthResponse = await response.json();
      console.log('User logged in:', data);
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <PageHeader
        backgroundImage="/images/bg_3.jpg"
        title="Inicia Sesión"
      />
      <LoginForm onLogin={handleLogin} />
    </>
  );
};

export default LoginPage;
