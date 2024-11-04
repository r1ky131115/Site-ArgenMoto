import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Box,
  Alert,
  Snackbar,
  CircularProgress
} from '@mui/material';
import { ClienteData } from '../../../types/Cliente';
import { ClienteService } from '../../../services/ClienteService';

interface ClienteDetailProps {
  clienteId: string;
}

const ClienteDetail: React.FC<ClienteDetailProps> = ({ clienteId }) => {
  const [cliente, setCliente] = useState<ClienteData | undefined>();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>('');
  const [successMessage, setSuccessMessage] = useState<string | null>('');

  useEffect(() => {
    if (clienteId && clienteId !== '0') {
      loadCliente();
    } else {
      setLoading(false);
      setError('ID de cliente no válido');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clienteId]);

  const loadCliente = async () => {
    try {
      setLoading(true);
      const response = await ClienteService.getCliente(clienteId);
      if (response) {
        setCliente(response);
      } else {
        setError('No se encontró el cliente');
      }
    } catch (err) {
      setError('Error al cargar los datos del cliente');
      console.error('Error loading cliente:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!cliente) return;
    
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async () => {
    if (!cliente) return;

    try {
      setLoading(true);
      const response = await ClienteService.updateCliente(clienteId, cliente);
      if (response) {
        setCliente(response);
        setSuccessMessage('Cliente actualizado correctamente');
        setIsEditing(false);
        await loadCliente();
      } else {
        setError('No se pudo actualizar el cliente');
      }      
    }catch (err) {
      setError('Error al actualizar el cliente');
      console.error('Error updating cliente:', err);
    }finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!cliente) {
    return (
      <Alert severity="error">
        No se encontró el cliente
      </Alert>
    );
  }

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={3}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" component="h2">
              Datos del usuario:
            </Typography>
            <Button
              variant="contained"
              color={isEditing ? "error" : "primary"}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancelar" : "Editar"}
            </Button>
          </Box>

          <Stack spacing={2}>
            {/* Campos no editables */}
            <TextField
              label="Tipo de Documento"
              value={cliente.tipoDocumento}
              disabled
              fullWidth
            />
            <TextField
              label="Número de Documento"
              value={cliente.numeroDocumento}
              disabled
              fullWidth
            />
            <TextField
              label="Email"
              value={cliente.email}
              disabled
              fullWidth
            />

            {/* Campos editables */}
            <TextField
              label="Apellido"
              name="apellido"
              value={cliente.apellido}
              onChange={handleInputChange}
              disabled={!isEditing}
              fullWidth
              required
            />
            <TextField
              label="Nombre"
              name="nombre"
              value={cliente.nombre}
              onChange={handleInputChange}
              disabled={!isEditing}
              fullWidth
              required
            />
            <TextField
              label="Domicilio"
              name="domicilio"
              value={cliente.domicilio}
              onChange={handleInputChange}
              disabled={!isEditing}
              fullWidth
            />
            <TextField
              label="Localidad"
              name="localidad"
              value={cliente.localidad}
              onChange={handleInputChange}
              disabled={!isEditing}
              fullWidth
            />
            <TextField
              label="Provincia"
              name="provincia"
              value={cliente.provincia}
              onChange={handleInputChange}
              disabled={!isEditing}
              fullWidth
            />
            <TextField
              label="Teléfono"
              name="telefono"
              value={cliente.telefono}
              onChange={handleInputChange}
              disabled={!isEditing}
              fullWidth
            />
          </Stack>

          {isEditing && (
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
              >
                Guardar Cambios
              </Button>
            </Box>
          )}
        </Stack>
      </CardContent>

      {/* Snackbar para mensajes de éxito y error */}
      <Snackbar
        open={!!error || !!successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={error ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {error || successMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default ClienteDetail;