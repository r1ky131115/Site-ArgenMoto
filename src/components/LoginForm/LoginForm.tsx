import React, { useState } from 'react';
import { LoginCredentials } from '../../types/auth';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { login } from '../../services/UserAPI';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const credentials: LoginCredentials = { email, password };

    try {
      // Llama al servicio de login
      await login(credentials);
      
      console.log('fin del login')
      navigate('/'); // Redirige a la página deseada
    } catch (err: any) {
      setError(err.message || 'Error en el inicio de sesión');
    } finally {
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

      {/* Mostrar error si existe */}
      {error && <p className="error-message">{error}</p>}

      <Button 
        className='btn-login mt-4'
        variant="contained" 
        type="submit"
        disabled={loading} 
        endIcon={<SendIcon />}
      >
        {loading ? 'Iniciando...' : 'Iniciar Sesión'}
      </Button>

      {/* Enlace de registro */}
      <p className="register-link">
        ¿Aún no tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </form>
  );
};

export default LoginForm;
