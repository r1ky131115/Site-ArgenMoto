// src/pages/RegisterPage/RegisterPage.tsx
import React from 'react';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import PageHeader from '../../components/Header/PageHeader';
import '../../index.css';

const breadcrumbs = [
  { text: 'Inicio', url: '/' },
  { text: 'Registro', url: '/register' }
];

const RegisterPage: React.FC = () => {
  return (
    <>
      <PageHeader
        backgroundImage="/images/bg_4.jpg"
        title="Regístrate"
        breadcrumbs={breadcrumbs}
      />
      <div className="form-container">
        <RegisterForm />
      </div>
    </>
  );
};

export default RegisterPage;