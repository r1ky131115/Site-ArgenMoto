import React, { useEffect, useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  SelectChangeEvent
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { CreateTurnoDTO, UpdateTurnoDTO } from '../../../types/Turno';

interface Cliente {
  id: number;
  nombre: string;
}

interface Articulo {
  id: number;
  descripcion: string;
}

interface Tecnico {
  id: number;
  nombre: string;
}

interface TurnoModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (turno: CreateTurnoDTO | UpdateTurnoDTO) => Promise<void>;
  turnoToEdit?: UpdateTurnoDTO;
  // Servicios para cargar las listas
  fetchClientes: () => Promise<Cliente[]>;
  fetchArticulos: () => Promise<Articulo[]>;
  fetchTecnicos: () => Promise<Tecnico[]>;
}

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto'
};

export const TurnoModal: React.FC<TurnoModalProps> = ({
  open,
  onClose,
  onSubmit,
  turnoToEdit,
  fetchClientes,
  fetchArticulos,
  fetchTecnicos
}) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<CreateTurnoDTO | UpdateTurnoDTO>({
    id: turnoToEdit?.id ?? 0,         // Asignar 0 o un valor predeterminado en caso de undefined
    idCliente: 0,
    idArticulo: 0,
    idTecnico: 0,
    fecha: new Date().toISOString().split('T')[0],
    hora: '09:00',
    estado: turnoToEdit?.estado ?? 1   // Asignar un valor predeterminado si estado no está definido
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [clientesData, articulosData, tecnicosData] = await Promise.all([
          fetchClientes(),
          fetchArticulos(),
          fetchTecnicos()
        ]);
        setClientes(clientesData);
        setArticulos(articulosData);
        setTecnicos(tecnicosData);
      } catch (err) {
        setError('Error al cargar los datos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      loadData();
      if (turnoToEdit) {
        setFormData(turnoToEdit);
      }
    }
  }, [open, turnoToEdit, fetchClientes, fetchArticulos, fetchTecnicos]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFormData(prev => ({
        ...prev,
        fecha: date.toISOString().split('T')[0]
      }));
    }
  };

  const handleTimeChange = (date: Date | null) => {
    if (date) {
      setFormData(prev => ({
        ...prev,
        hora: date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validación simple
    let errorMessages = [];

    if (!formData.idCliente) {
        errorMessages.push("Debe seleccionar un cliente.");
    }
    if (!formData.idArticulo) {
        errorMessages.push("Debe seleccionar un artículo.");
    }
    if (!formData.idTecnico) {
        errorMessages.push("Debe seleccionar un técnico.");
    }
    if (!formData.fecha) {
        errorMessages.push("La fecha es requerida.");
    }
    if (!formData.hora) {
        errorMessages.push("La hora es requerida.");
    }
    if (turnoToEdit && !formData.estado) {
        errorMessages.push("El estado es requerido.");
    }

    if (errorMessages.length > 0) {
        // Muestra el primer error encontrado
        setError(errorMessages.join(" ")); 
        return; // Detiene el envío si hay errores
    }

    // Si no hay errores, continúa con el envío del formulario
    setError(""); // Limpia cualquier error previo
    // Aquí puedes agregar tu lógica para enviar el formulario

    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      console.error('Error al guardar el turno:', err);
      setError('Error al guardar el turno');
    }
  };

  if (loading) {
    return null; // O un spinner si prefieres
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
          {turnoToEdit ? 'Editar Turno' : 'Nuevo Turno'}
        </Typography>

        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="cliente-label">Cliente</InputLabel>
                <Select
                  labelId="cliente-label"
                  name="idCliente"
                  value={formData.idCliente}
                  onChange={handleSelectChange}
                  label="Cliente"
                  required
                >
                  {clientes.map(cliente => (
                    <MenuItem key={cliente.id} value={cliente.id}>
                      {cliente.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="articulo-label">Artículo</InputLabel>
                <Select
                  labelId="articulo-label"
                  name="idArticulo"
                  value={formData.idArticulo}
                  onChange={handleSelectChange}
                  label="Artículo"
                  required
                >
                  {articulos.map(articulo => (
                    <MenuItem key={articulo.id} value={articulo.id}>
                      {articulo.descripcion}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="tecnico-label">Técnico</InputLabel>
                <Select
                  labelId="tecnico-label"
                  name="idTecnico"
                  value={formData.idTecnico}
                  onChange={handleSelectChange}
                  label="Técnico"
                  required
                >
                  {tecnicos.map(tecnico => (
                    <MenuItem key={tecnico.id} value={tecnico.id}>
                      {tecnico.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                label="Fecha"
                value={new Date(formData.fecha)}
                onChange={handleDateChange}
                format="dd/MM/yyyy"
                minDate={new Date()} // Establece la fecha mínima a hoy
                />
            </LocalizationProvider>
            </Grid>

            <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                    label="Hora"
                    value={new Date(`2024-01-01T${formData.hora}`)}
                    onChange={handleTimeChange}
                    shouldDisableTime={(timeValue, clockType) => {
                        const hour = timeValue.getHours();
                        // Deshabilita horas fuera del rango permitido (9 AM a 5 PM)
                        return hour < 9 || hour > 17; 
                    }}
                />
            </LocalizationProvider>
            </Grid>

            {turnoToEdit && (
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="estado-label">Estado</InputLabel>
                  <Select
                    labelId="estado-label"
                    name="estado"
                    value={formData.estado}
                    onChange={handleSelectChange}
                    label="Estado"
                    required
                  >
                    <MenuItem value="Pendiente">Pendiente</MenuItem>
                    <MenuItem value="Finalizado">Finalizado</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              {turnoToEdit ? 'Guardar Cambios' : 'Crear Turno'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};