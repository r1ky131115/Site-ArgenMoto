import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/UserAPI';
import SuccessModal from '../Modal/SuccessModal';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { Alert } from '@mui/material';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [dni, setDni] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userData = {
        numeroDocumento: dni,
        apellido: lastName,
        nombre: firstName,
        domicilio: address,
        localidad: city,
        provincia: province,
        telefono: phone,
        email: email,
        passwordHash: password
      };

      await createUser(userData);
      setShowSuccessModal(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }

  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate('/');
    window.scrollTo(0, 0);
  };

  return (
    <>
      <form className="register-form container mt-4 mb-4" onSubmit={handleSubmit}>
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Registro de Usuario</h2>
                
                <div className="form-container row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="dni" className="form-label">DNI</label>
                    <input
                      type="text"
                      className="form-control"
                      id="dni"
                      value={dni}
                      onChange={(e) => setDni(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastName" className="form-label">Apellido</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName" className="form-label">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="address" className="form-label">Domicilio</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="city" className="form-label">Localidad</label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="province" className="form-label">Provincia</label>
                    <input
                      type="text"
                      className="form-control"
                      id="province"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="phone" className="form-label">Teléfono</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                {error && 
                  <Alert severity="error">{error}</Alert>
                }

                <div className="d-flex justify-content-between mt-4 gap-3">
                  <Button 
                    variant="outlined" 
                    href='/'
                    sx={{ width: '25%' }}
                  >
                    Volver
                  </Button>
                  
                  <Button 
                    variant="contained" 
                    type="submit"
                    disabled={loading} 
                    endIcon={<SendIcon />}
                    sx={{ width: '70%' }}
                  >
                    {loading ? 'Registrando...' : 'Registrar'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleModalClose}
        message="Registro exitoso"
      />
    </>
  );
};

export default RegisterForm;