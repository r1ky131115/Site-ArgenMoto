import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/UserAPI';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SuccessModal from '../Modal/Success/SuccessModal';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Send as SendIcon,
  ArrowBack as ArrowBackIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';

interface UserData {
  numeroDocumento: string;
  apellido: string;
  nombre: string;
  domicilio: string;
  localidad: string;
  provincia: string;
  telefono: string;
  email: string;
  passwordHash: string;
}

// Definimos los campos requeridos
const requiredFields = [
  'numeroDocumento',
  'apellido',
  'nombre',
  'email',
  'passwordHash',
  'domicilio'
];

const validationSchema = Yup.object({
  numeroDocumento: Yup.string()
    .matches(/^\d{7,8}$/, 'DNI debe tener 7 u 8 dígitos')
    .required('DNI es requerido'),
  apellido: Yup.string()
    .min(2, 'Apellido debe tener al menos 2 caracteres')
    .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/, 'Apellido solo puede contener letras')
    .required('Apellido es requerido'),
  nombre: Yup.string()
    .min(2, 'Nombre debe tener al menos 2 caracteres')
    .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/, 'Nombre solo puede contener letras')
    .required('Nombre es requerido'),
  email: Yup.string()
    .email('Email inválido')
    .required('Email es requerido'),
  passwordHash: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
    .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
    .matches(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
    .matches(/[^A-Za-z0-9]/, 'La contraseña debe contener al menos un carácter especial')
    .required('Contraseña es requerida'),
  domicilio: Yup.string()
    .min(5, 'Domicilio debe tener al menos 5 caracteres')
    .required('Domicilio es requerido'),
  localidad: Yup.string(),
  provincia: Yup.string(),
  telefono: Yup.string()
    .matches(/^\+?[0-9]{10,}$/, 'Teléfono inválido'),
});

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      numeroDocumento: '',
      apellido: '',
      nombre: '',
      domicilio: '',
      localidad: '',
      provincia: '',
      telefono: '',
      email: '',
      passwordHash: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setError(null);
      try {
        await createUser(values);
        setShowSuccessModal(true);
      } catch (error: any) {
        setError(error.message || 'Ha ocurrido un error durante el registro');
      }
    },
  });

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate('/');
    window.scrollTo(0, 0);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formFields = [
    { id: 'numeroDocumento', label: 'DNI', type: 'text' },
    { id: 'apellido', label: 'Apellido', type: 'text' },
    { id: 'nombre', label: 'Nombre', type: 'text' },
    { id: 'email', label: 'Email', type: 'email' },
    { 
      id: 'passwordHash', 
      label: 'Contraseña', 
      type: showPassword ? 'text' : 'password',
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={togglePasswordVisibility}
            edge="end"
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </InputAdornment>
      )
    },
    { id: 'domicilio', label: 'Domicilio', type: 'text' },
    { id: 'localidad', label: 'Localidad', type: 'text' },
    { id: 'provincia', label: 'Provincia', type: 'text' },
    { id: 'telefono', label: 'Teléfono', type: 'tel' },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <Card elevation={3}>
          <CardContent>
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom 
              align="center"
              sx={{ mb: 4 }}
            >
              Registro de Usuario
            </Typography>

            <Grid container spacing={3}>
              {formFields.map((field) => (
                <Grid item xs={12} sm={6} key={field.id}>
                  <TextField
                    id={field.id}
                    name={field.id}
                    label={field.label}
                    type={field.type}
                    fullWidth
                    variant="outlined"
                    value={formik.values[field.id as keyof UserData]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched[field.id as keyof UserData] && 
                      Boolean(formik.errors[field.id as keyof UserData])
                    }
                    helperText={
                      formik.touched[field.id as keyof UserData] && 
                      formik.errors[field.id as keyof UserData]
                    }
                    InputProps={field.endAdornment ? { endAdornment: field.endAdornment } : undefined}
                    required={requiredFields.includes(field.id)}
                  />
                </Grid>
              ))}
            </Grid>

            {error && (
              <Alert 
                severity="error" 
                sx={{ mt: 3 }}
                onClose={() => setError(null)}
              >
                {error}
              </Alert>
            )}

            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                mt: 4, 
                gap: 2 
              }}
            >
              <Button
                variant="outlined"
                onClick={() => navigate('/')}
                startIcon={<ArrowBackIcon />}
                sx={{ width: '25%' }}
              >
                Volver
              </Button>

              <Button
                variant="contained"
                type="submit"
                disabled={formik.isSubmitting || !formik.isValid}
                endIcon={formik.isSubmitting ? <CircularProgress size={20} /> : <SendIcon />}
                sx={{ width: '70%' }}
              >
                {formik.isSubmitting ? 'Registrando...' : 'Registrar'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleModalClose}
        message="Registro exitoso"
      />
    </Container>
  );
};

export default RegisterForm;