import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import PageHeader from '../../components/Header/PageHeader'; 

const LoginPage: React.FC = () => {

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
