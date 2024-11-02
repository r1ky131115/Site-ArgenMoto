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
import axios from 'axios';

interface Cliente {
  idCliente: number;
  tipoDocumento: string;
  numeroDocumento: string;
  apellido: string;
  nombre: string;
  domicilio: string;
  localidad: string;
  provincia: string;
  telefono: string;
  email: string;
}

interface ClienteDetailProps {
  clienteId: string;
  onUpdateSuccess?: () => void;
}

const ClienteDetail: React.FC<ClienteDetailProps> = ({ clienteId, onUpdateSuccess }) => {
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    loadCliente();
  });

  const loadCliente = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/clientes/${clienteId}`);
      setCliente(response.data);
      setError('');
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
      await axios.put(`/api/clientes/${clienteId}`, cliente);
      setSuccessMessage('Cliente actualizado correctamente');
      setIsEditing(false);
      onUpdateSuccess?.();
    } catch (err) {
      setError('Error al actualizar el cliente');
      console.error('Error updating cliente:', err);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
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

  return (
    <Card>
      <CardContent>
        <Stack spacing={3}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" component="h2">
              Datos del Cliente
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

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
      >
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage('')}
      >
        <Alert severity="success" onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default ClienteDetail;