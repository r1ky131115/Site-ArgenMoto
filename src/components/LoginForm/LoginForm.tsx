import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './LoginForm.css';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { login } from '../../services/UserAPI';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const { login: authLogin } = useAuth();
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login({ email, password });
      
      authLogin(response.token, response.usuario);
      
      // Usar window.location para la redirección final
      const from = location.state?.from || '/panel';
      window.location.href = from;
    } catch (err: any) {
      setError(err.message || 'Error en el inicio de sesión');
      setLoading(false);
    }
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
        {loading ? 'Iniciando...' : 'Iniciar Sesión'}
      </Button>

      {/* Mostrar error si existe */}
      {error && <p className="error-message">{error}</p>}

      {/* Enlace de registro */}
      <p className="register-link">
        ¿Aún no tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </form>
  );
};

export default LoginForm;
