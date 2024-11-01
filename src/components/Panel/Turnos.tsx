import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Turno } from '../../types/Turno';
import { createTurno, deleteTurno, getTurnos, updateTurno } from '../../services/TurnoService';
import { 
  Card,
  CardContent,
  CardHeader,
  Button,
  Typography,
  Grid,
  Chip,
  Box,
  CircularProgress,
  Divider
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { TurnoModal } from '../Modal/Turno/TurnoModal';
import { CreateTurnoDTO, UpdateTurnoDTO } from '../../types/Turno';

export const Turnos: React.FC = () => {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTurno, setSelectedTurno] = useState<UpdateTurnoDTO | undefined>();


  const fetchClientes = async () => {
    // Llamada a tu API
    return []; // Retorna array de clientes
  };

  const fetchArticulos = async () => {
    // Llamada a tu API
    return []; // Retorna array de artículos
  };

  const fetchTecnicos = async () => {
    // Llamada a tu API
    return []; // Retorna array de técnicos
  };

  const handleCreateOrUpdate = async (turnoData: CreateTurnoDTO | UpdateTurnoDTO) => {
    if ('id' in turnoData) {
      await updateTurno(turnoData.id, turnoData);
    } else {
      await createTurno(turnoData);
    }
    // Recargar la lista de turnos
    setModalOpen(false);
  };

  const handleEdit = (turnoEdit: Turno) => {
    const editTurno: UpdateTurnoDTO = {
      id: turnoEdit.id,
      fecha: turnoEdit.fecha,
      hora: turnoEdit.hora,
      estado: parseInt(turnoEdit.estado),
      idCliente: turnoEdit.cliente.id,
      idArticulo: turnoEdit.articulo.id,
      idTecnico: turnoEdit.tecnico.id
    };

    setSelectedTurno(editTurno);
    setModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedTurno(undefined);
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchTurnosData = async () => {
      if (!user?.id) return;
      try {
        const fetchedTurnos = await getTurnos(user.id);
        console.log(fetchedTurnos);
        setTurnos(fetchedTurnos);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching turnos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTurnosData();
  }, [user?.id]);

  const handleDelete = async (clienteId: number, turnoId: number) => {
    try {
      await deleteTurno({
        cliente_Id: clienteId,
        turno_Id: turnoId
      });
      // Recargar la lista de turnos o mostrar mensaje de éxito
    } catch (error) {
      // Manejar el error
    }
  };

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4} textAlign="center" color="error.main">
        <Typography>{error}</Typography>
      </Box>
    );
  }

  return (
    <>
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Mis Turnos
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
          onClick={handleCreate}
        >
          Nuevo Turno
        </Button>
      </Box>

      {!turnos.length ? (
        <Box textAlign="center" py={4}>
          <Typography color="text.secondary">
            No hay turnos programados.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {turnos.map((turno, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card>
                <CardHeader
                  title={
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="h6">
                        Turno para {turno.fecha ? formatDate(turno.fecha) : 'Fecha no disponible'} - {turno.hora}
                      </Typography>
                      <Chip
                        label={turno.estado}
                        color={turno.estado === 'Pendiente' ? 'success' : 'error'}
                        size="small"
                      />
                    </Box>
                  }
                />
                <CardContent>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Información del Cliente
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Nombre:</strong> {turno.cliente.nombre} {turno.cliente.apellido}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Documento:</strong> {turno.cliente.tipoDocumento} {turno.cliente.numeroDocumento}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Artículo
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Descripción:</strong> {turno.articulo.descripcion}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Marca/Modelo:</strong> {turno.articulo.marca} {turno.articulo.modelo}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Código:</strong> {turno.articulo.codigoArticulo}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Técnico Asignado
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Nombre:</strong> {turno.tecnico.nombre}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Especialidad:</strong> {turno.tecnico.especialidad}
                    </Typography>
                  </Box>

                  <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => handleEdit(turno)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(turno.cliente.id, turno.id)}
                    >
                      Eliminar
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
    <TurnoModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedTurno(undefined);
        }}
        onSubmit={handleCreateOrUpdate}
        turnoToEdit={selectedTurno}
        fetchClientes={fetchClientes}
        fetchArticulos={fetchArticulos}
        fetchTecnicos={fetchTecnicos}
      />
    </>
  );
};

export default Turnos;