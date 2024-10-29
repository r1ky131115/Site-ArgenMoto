// src/components/LoginForm/LoginForm.tsx

import React, { useState } from 'react';
import { LoginCredentials } from '../../types/auth';
import { Link, Routes } from 'react-router-dom'; // Importa el Link de react-router-dom
import './LoginForm.css';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';

interface LoginFormProps {
  onLogin: (credentials: LoginCredentials) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onLogin({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Iniciar Sesión</button>

      {/* Enlace de registro */}
      <p className="register-link">
        ¿Aún no tienes cuenta?{' '}
        <Link to="/register">Regístrate aquí</Link>
      </p>
    </form>
  );
};

export default LoginForm;










