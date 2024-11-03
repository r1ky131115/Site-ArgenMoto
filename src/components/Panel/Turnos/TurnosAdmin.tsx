// components/TurnosList.tsx
import React from 'react';
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
import { Turno } from '../../../types/Turno';
import utility from '../../../utils/format';


const TurnosList: React.FC = () => {
  const { turnos, loading, error, setError, successMessage, setSuccessMessage, deleteTurnoForAdmin, updateTurnoEstado } = useTurnos();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
          <Typography>{error}</Typography>
      </Alert>
    );
  }

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white'}}>N° Turno</TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white'}}>Cliente</TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white'}}>Artículo</TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white'}}>Técnico</TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white'}}>Fecha</TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white'}}>Hora</TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white'}}>Estado</TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white'}}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          {!turnos.length ? (
            <Box textAlign="center" py={4}>
              <Typography color="text.secondary">
                No hay turnos programados.
              </Typography>
            </Box>
          ) : (
          <TableBody>  
            {turnos.map((turno: Turno) => (
              <TableRow key={turno.id}>
                <TableCell>
                  {turno.numeroTurno}
                </TableCell>
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
                        updateTurnoEstado(turno.id);
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
          )}
        </Table>
      </TableContainer>

      {turnos.length === 0 && (
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          No hay turnos disponibles
        </Typography>
      )}

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
    </Box>
  );
};

export default TurnosList;