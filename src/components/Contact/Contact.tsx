import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  styled,
  IconButton,
} from '@mui/material';
import {
  LocationOn,
  Phone,
  Email,
} from '@mui/icons-material';

// Tipos para el formulario
interface IContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Estilos personalizados
const ContactCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  '& .MuiIconButton-root': {
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const ContactForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
}));

const MapContainer = styled(Paper)(({ theme }) => ({
  height: '400px',
  width: '100%',
  marginTop: theme.spacing(6),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const Contacto: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<IContactForm>({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    }
  });

  const onSubmit = (data: IContactForm) => {
    console.log('Form submitted:', data);
    // Aquí puedes agregar la lógica para enviar el formulario
  };

  const contactInfo = [
    {
      icon: <LocationOn />,
      title: 'Dirección:',
      content: 'Av. Calchaquí 6200 (1888) Florencio Varela Buenos Aires, Argentina',
      link: undefined,
    },
    {
      icon: <Phone />,
      title: 'Teléfono:',
      content: '+54 11 4275-6100',
      link: '+54 11 4275-6100',
    },
    {
      icon: <Email />,
      title: 'Email:',
      content: 'infovirtual@unaj.edu.ar',
      link: 'mailto:infovirtual@unaj.edu.ar',
    },
  ];

  return (
    <Box component="section" py={8}>
      <Container>
        <Grid container spacing={4}>
          {/* Información de contacto */}
          <Grid item xs={12} md={4}>
            <Box>
              {contactInfo.map((info, index) => (
                <ContactCard key={index} elevation={0}>
                  <IconButton size="large">
                    {info.icon}
                  </IconButton>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {info.title}
                    </Typography>
                    {info.link ? (
                      <Typography 
                        component="a" 
                        href={info.link}
                        color="primary"
                        sx={{ textDecoration: 'none' }}
                      >
                        {info.content}
                      </Typography>
                    ) : (
                      <Typography>{info.content}</Typography>
                    )}
                  </Box>
                </ContactCard>
              ))}
            </Box>
          </Grid>

          {/* Formulario de contacto */}
          <Grid item xs={12} md={8}>
            <ContactForm elevation={0}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: 'El nombre es requerido' }}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      fullWidth
                      label="Nombre"
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />

                <Controller
                  name="email"
                  control={control}
                  rules={{ 
                    required: 'El email es requerido',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email inválido'
                    }
                  }}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      fullWidth
                      label="Email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />

                <Controller
                  name="subject"
                  control={control}
                  rules={{ required: 'El asunto es requerido' }}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      fullWidth
                      label="Asunto"
                      error={!!errors.subject}
                      helperText={errors.subject?.message}
                    />
                  )}
                />

                <Controller
                  name="message"
                  control={control}
                  rules={{ required: 'El mensaje es requerido' }}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      fullWidth
                      label="Mensaje"
                      multiline
                      rows={7}
                      error={!!errors.message}
                      helperText={errors.message?.message}
                    />
                  )}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ py: 1.5, px: 4 }}
                >
                  Enviar Mensaje
                </Button>
              </form>
            </ContactForm>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contacto;