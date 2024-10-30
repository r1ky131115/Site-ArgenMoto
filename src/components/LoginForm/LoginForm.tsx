import React, { useState } from 'react';
import { LoginCredentials } from '../../types/auth';
import { Link } from 'react-router-dom';
import './LoginForm.css';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

interface LoginFormProps {
  onLogin: (credentials: LoginCredentials) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onLogin({ email, password });
    setLoading(true);
  };

  return (
    <form className="form-login" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-container-login">
          <label className="lbl-login" htmlFor="email">Email</label>
          <input
            className="input-login"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-container-login">
          <label className="lbl-login" htmlFor="password">Contraseña</label>
          <input
            className="input-login"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <Button 
        className='btn-login mt-4'
        variant="contained" 
        type="submit"
        disabled={loading} 
        endIcon={<SendIcon />}
      >
        Iniciar Sesión
      </Button>

      {/* Enlace de registro */}
      <p className="register-link">
        ¿Aún no tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </form>
  );
};

export default LoginForm;










