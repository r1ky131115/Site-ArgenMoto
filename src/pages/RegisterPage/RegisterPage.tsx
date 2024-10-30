// src/pages/RegisterPage/RegisterPage.tsx
import React from 'react';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import PageHeader from '../../components/Header/PageHeader';
import '../../index.css';

const RegisterPage: React.FC = () => {
  return (
    <>
      <PageHeader
        backgroundImage="/images/bg_3.jpg"
        title="Regístrate"
      />
      <div className="form-container">
        <RegisterForm />
      </div>
    </>
  );
};

export default RegisterPage;