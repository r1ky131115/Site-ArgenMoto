// src/pages/LoginPage.tsx

import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import { LoginCredentials, AuthResponse } from '../../types/auth';
import PageHeader from '../../components/Header/PageHeader';  
import VehicleGrid from '../../components/Sections/VehicleCardSection';
import { ListOfVehicles } from "../../utils/Mock/mockVehicles";
import '../../index.css';
import './LoginPage.css'; // Asegúrate de tener el archivo CSS para LoginPage

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
      
      // Aquí podrías guardar el token en localStorage, Redux, o un Context
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
      <div className="form-container"> {/* Nueva clase añadida */}
        <LoginForm onLogin={handleLogin} />
      </div>
    </>
  );
};

export default LoginPage;
