// src/pages/RegisterPage/RegisterPage.tsx
import React from 'react';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import PageHeader from '../../components/Header/PageHeader';
import '../../index.css';
import './RegisterPage.css'


const RegisterPage: React.FC = () => {
  const handleRegister = async (userData: {
    dni: string;
    lastName: string;
    firstName: string;
    address: string;
    city?: string;
    province?: string;
    phone?: string;
    email: string;
    password: string;
  }) => {
    try {
      // Simulación de una llamada a la API
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      const data = await response.json();
      console.log('User registered:', data);
      
      // Aquí podrías redirigir al usuario o mostrar un mensaje de éxito
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <PageHeader
        backgroundImage="/images/bg_3.jpg"
        title="Regístrate"
      />
      <div className="form-container"> {/* Nueva clase añadida */}
        <RegisterForm onRegister={handleRegister} />
      </div>
    </>
  );
};

export default RegisterPage;