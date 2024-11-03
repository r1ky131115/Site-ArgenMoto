// src/components/OrderList.tsx
import React, { useEffect, useState } from 'react';
import { ordenCompraService } from '../../../services/OrdenCompraService';
import { OrdenCompraResponse } from '../../../types/OrdenCompra';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Select, MenuItem, Typography, Snackbar, Alert,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<OrdenCompraResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await ordenCompraService.getAllOrdenesCompra();
      setOrders(response);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error desconocido al cargar las órdenes');
    }
  };

  const handleChangeStatus = async (orderId: number, newStatus: string) => {
    try {
      const updatedOrder = orders.find(order => order.id === orderId);
      if (updatedOrder) {
        
        await ordenCompraService.updateOrdenCompra({id: orderId, estado: newStatus});
        setSuccessMessage('Estado actualizado correctamente');
        loadOrders();
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al actualizar el estado');
    }
  };

  const handleDeleteOrder = async (orderId: number) => {
    try {
      await ordenCompraService.deleteOrdenCompra(orderId);
      setSuccessMessage('Orden eliminada exitosamente');
      loadOrders();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al eliminar la orden');
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Lista de Órdenes de Compra
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Número</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Proveedor</TableCell>
              <TableCell>Precio Total</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <TableRow key={order.id}>
                <TableCell>{order.numero}</TableCell>
                <TableCell>{new Date(order.fecha).toLocaleDateString()}</TableCell>
                <TableCell>{order.razonSocial}</TableCell>
                <TableCell>{order.precioTotal.toFixed(2)}</TableCell>
                <TableCell>
                  <Select
                    value={order.estado}
                    onChange={(e) => handleChangeStatus(order.id, e.target.value as string)}
                    variant="outlined"
                    size="small"
                  >
                    <MenuItem value="Pendiente">Pendiente</MenuItem>
                    <MenuItem value="En proceso">En proceso</MenuItem>
                    <MenuItem value="Finalizada">Finalizada</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                
                <Button 
                      variant="outlined" 
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteOrder(order.id)}
                      size="small"
                    >
                      Eliminar
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
    </div>
  );
};

export default OrderList;