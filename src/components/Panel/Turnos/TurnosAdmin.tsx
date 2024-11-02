// components/TurnosList.tsx
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  Typography, 
  Box, 
  Chip,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

import { useTurnos } from '../../../hooks/useTurnos';
import { Turno, TurnoEstado } from '../../../types/Turno';
import utility from '../../../utils/format';


const TurnosList: React.FC = () => {
  const { turnos, loading, error, successMessage, deleteTurnoForAdmin, updateTurnoEstado } = useTurnos();

  
  const [errorMsj, setError] = useState<string>('');
  const [successMsj, setSuccessMessage] = useState<string>('');

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white'}}>Cliente</TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white'}}>Artículo</TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white'}}>Técnico</TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white'}}>Fecha</TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white'}}>Hora</TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white'}}>Estado</TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white'}}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {turnos.map((turno: Turno) => (
              <TableRow key={turno.id}>
                <TableCell>
                  {turno.cliente.nombre} {turno.cliente.apellido}
                </TableCell>
                <TableCell>
                  {turno.articulo.marca} {turno.articulo.modelo}
                </TableCell>
                <TableCell>{turno.tecnico.nombre}</TableCell>
                <TableCell>{utility.formatDate(turno.fecha)}</TableCell>
                <TableCell>{utility.formatTime(turno.hora)}</TableCell>
                <TableCell>
                    <Chip
                        label={turno.estado}
                        color={turno.estado === 'Pendiente' ? 'success' : 'error'}
                        size="small"
                      />
                </TableCell>
                <TableCell align="right">
                  <Box display="flex" gap={1}>
                    <Button 
                      variant="outlined" 
                      color={turno.estado === 'Pendiente' ? 'success' : 'warning'}
                      startIcon={turno.estado === 'Pendiente' ? <CheckCircleIcon /> : <PendingIcon />}
                      onClick={() => {
                        const nuevoEstado: TurnoEstado = turno.estado === 'Pendiente' ? 'Finalizado' : 'Pendiente'; // Cambia el estado
                        updateTurnoEstado(turno.id, nuevoEstado);
                      }}
                      size="small"
                    >
                      {turno.estado === 'Pendiente' ? 'Finalizar' : 'Reabrir'}
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => deleteTurnoForAdmin(turno.id)}
                      size="small"
                    >
                      Eliminar
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {turnos.length === 0 && (
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          No hay turnos disponibles
        </Typography>
      )}

      <Snackbar
        open={!!error}
        autoHideDuration={2000}
      >
        <Alert severity="error" onClose={() => setError(errorMsj)}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={2000}
      >
        <Alert severity="success" onClose={() => setSuccessMessage(successMsj)}>
          {successMessage}
        </Alert>
      </Snackbar>

    </Box>
  );
};

export default TurnosList;