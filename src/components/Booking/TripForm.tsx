import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import es from 'date-fns/locale/es';
import ArticleService from '../../services/ArticleService';
import { Articulo } from '../../types/ArticleProps';

// Tipos para el formulario
interface IFormInputs {
  branch: string;
  motorcycle: string;
  visitDate: Date | null;
  visitTime: Date | null;
}

// Estilos personalizados
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: theme.spacing(2),
}));

const FormContainer = styled(Box)(({ theme }) => ({
  '& .MuiFormControl-root': {
    marginBottom: theme.spacing(2),
  },
  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(1),
  },
}));

const TripForm: React.FC = () => {
  const [articles, setArticles] = useState<Articulo[]>([]);
  const { control, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    defaultValues: {
      branch: '',
      motorcycle: '',
      visitDate: null,
      visitTime: null,
    }
  });

  const onSubmit = (data: IFormInputs) => {
    console.log('Form submitted:', data);
    // Aquí puedes agregar la lógica para enviar los datos
  };

  const branches = [
    { value: 'lanus', label: 'Lanus' },
    { value: 'la-plata', label: 'La Plata' },
  ];

  useEffect(() => {
      const fetchArticles = async () => {
        try {
          const response = await ArticleService.getArticles();
          if (!response) throw new Error('Error al cargar artículos');
          setArticles(response);
        } catch (error) {
          console.log('Error al cargar artículos');
        }
      };
      fetchArticles();
    
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <Box className="col-md-4 d-flex align-items-center">
        <StyledPaper elevation={3}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormContainer>
              <Typography variant="h5" component="h2" gutterBottom>
                Contáctenos
              </Typography>

              <Controller
                name="branch"
                control={control}
                rules={{ required: 'Por favor seleccione una sucursal' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.branch}>
                    <InputLabel>Sucursal</InputLabel>
                    <Select {...field} label="Sucursal">
                      {branches.map((branch) => (
                        <MenuItem key={branch.value} value={branch.value}>
                          {branch.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.branch && (
                      <FormHelperText>{errors.branch.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                name="motorcycle"
                control={control}
                rules={{ required: 'Por favor seleccione una moto' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.motorcycle}>
                    <InputLabel>Moto</InputLabel>
                    <Select {...field} label="Moto">
                      {articles.map((article) => (
                        <MenuItem key={article.id} value={article.id}>
                          {article.marca} - {article.modelo}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.motorcycle && (
                      <FormHelperText>{errors.motorcycle.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                name="visitDate"
                control={control}
                rules={{ required: 'Por favor seleccione una fecha' }}
                render={({ field }) => (
                  <DatePicker
                    label="Fecha de visita"
                    {...field}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.visitDate,
                        helperText: errors.visitDate?.message,
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="visitTime"
                control={control}
                rules={{ required: 'Por favor seleccione un horario' }}
                render={({ field }) => (
                  <TimePicker
                    label="Horario de visita"
                    {...field}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.visitTime,
                        helperText: errors.visitTime?.message,
                      },
                    }}
                  />
                )}
              />

              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                sx={{ mt: 2, py: 1.5 }}
              >
                Reservar ahora
              </Button>
            </FormContainer>
          </form>
        </StyledPaper>
      </Box>
    </LocalizationProvider>
  );
};

export default TripForm;