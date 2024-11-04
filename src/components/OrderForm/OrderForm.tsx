import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  List,
  ListItem,
  Divider,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from '@mui/material';
import { ShoppingCart, Package, DollarSign } from 'lucide-react';
import { Proveedor } from '../../types/Proveedor';
import { Articulo } from '../../types/ArticleProps';
import { OrderDetail } from '../../types/OrdenDetail';
import ProveedorService from '../../services/ProveedorService';
import ArticleService from '../../services/ArticleService';
import { OrdenCompraData } from '../../types/OrdenCompra';
import { ordenCompraService } from '../../services/OrdenCompraService';

const OrderForm = () => {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [article, setArticles] = useState<Articulo[]>([]);
  const [selectedProveedor, setSelectedProveedor] = useState<Proveedor | null>(null);
  const [selectedArticulo, setSelectedArticulo] = useState<Articulo | null>(null);
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [cantidad, setCantidad] = useState(1);
  const [error, setError] = useState<string | null>('');
  const [successMessage, setSuccessMessage] = useState<string | null>('');

  // Fetch proveedores on component mount
  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await ProveedorService.getProveedores();
        if (!response) throw new Error('Error al cargar proveedores');
        setProveedores(response);
      } catch (error) {
        setError('Error al cargar proveedores');
      }
    };
    fetchProveedores();
  }, []);

  // Fetch artículos when provider is selected
  useEffect(() => {
    if (selectedProveedor) {
      const fetchArticles = async () => {
        try {
          const response = await ArticleService.GetArticlesPorProveedor(selectedProveedor.id);
          if (!response) throw new Error('Error al cargar artículos');
          setArticles(response);
        } catch (error) {
          setError('Error al cargar artículos');
        }
      };
      fetchArticles();
    }
  }, [selectedProveedor]);

  const handleAddDetail = () => {
    if (!selectedArticulo || cantidad <= 0) return;

    const newDetail: OrderDetail = {
      idArticulo: selectedArticulo.id,
      articulo: selectedArticulo,
      cantidad: cantidad,
      precio: selectedArticulo.precio,
      subtotal: selectedArticulo.precio * cantidad
    };

    setOrderDetails([...orderDetails, newDetail]);
    setSelectedArticulo(null);
    setCantidad(1);
  };

  const handleGenerateOrder = async () => {
    if (!selectedProveedor || orderDetails.length === 0) return;

    const total = orderDetails.reduce((sum, detail) => sum + detail.subtotal, 0);
    
    const orderData: OrdenCompraData = {
      idProveedor: selectedProveedor.id,
      razonSocial: selectedProveedor.razonSocial || `${selectedProveedor.apellido} ${selectedProveedor.nombre}`,
      domicilio: selectedProveedor.domicilio,
      localidad: selectedProveedor.localidad,
      provincia: selectedProveedor.provincia,
      fecha: new Date().toISOString(),
      precioTotal: total,
      precioReal: total, // You might want to adjust this based on your business logic
      estado: "Pendiente",
      ordenCompraDetalles: orderDetails.map(detail => ({
        idArticulo: detail.idArticulo,
        cantidad: detail.cantidad,
        precio: detail.precio
      }))
    };

    try {
      const response = await ordenCompraService.createOrdenCompra(orderData);
      if (!response) throw new Error('Error al generar la orden de compra');
      setSuccessMessage('Orden de compra generada exitosamente');
      // Reset form
      setSelectedProveedor(null);
      setOrderDetails([]);
      setCantidad(1);
    } catch (error) {
      console.error('Error:', error);
      setError('Error al generar la orden de compra');
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ShoppingCart size={32} />
                  Orden de Compra
                </Typography>

                {!selectedProveedor ? (
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Seleccionar Proveedor</InputLabel>
                    <Select
                      label="Seleccionar Proveedor"
                      onChange={(e) => {
                        const provider = proveedores.find(p => p.id === e.target.value);
                        setSelectedProveedor(provider || null);
                      }}
                    >
                      {proveedores.map((proveedor) => (
                        <MenuItem key={proveedor.id} value={proveedor.id}>
                          {proveedor.razonSocial || `${proveedor.apellido}, ${proveedor.nombre}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>Proveedor Seleccionado</Typography>
                    <Typography><strong>Razón Social:</strong> {selectedProveedor.razonSocial || `${selectedProveedor.apellido}, ${selectedProveedor.nombre}`}</Typography>
                    <Typography><strong>CUIT:</strong> {selectedProveedor.cuit}</Typography>
                    <Typography><strong>Dirección:</strong> {selectedProveedor.domicilio}, {selectedProveedor.localidad}, {selectedProveedor.provincia}</Typography>
                    <Typography><strong>Contacto:</strong> {selectedProveedor.telefono} | {selectedProveedor.email}</Typography>
                  </Paper>
                )}

                {selectedProveedor && (
                  <Box sx={{ mt: 3 }}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Seleccionar Artículo</InputLabel>
                      <Select
                        value={selectedArticulo?.id || ''}
                        label="Seleccionar Artículo"
                        onChange={(e) => {
                          const articulo = article.find(a => a.id === e.target.value);
                          setSelectedArticulo(articulo || null);
                        }}
                      >
                        {article.map((articulo) => (
                          <MenuItem key={articulo.id} value={articulo.id}>
                            {articulo.codigo} - {articulo.descripcion} (${articulo.precio})
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {selectedArticulo && (
                      <>
                        <TextField
                          fullWidth
                          type="number"
                          label="Cantidad"
                          value={cantidad}
                          onChange={(e) => setCantidad(Number(e.target.value))}
                          sx={{ mb: 2 }}
                        />

                        <Typography sx={{ mb: 2 }}>
                          <strong>Precio Unitario:</strong> ${selectedArticulo.precio}
                        </Typography>

                        <Typography sx={{ mb: 2 }}>
                          <strong>Subtotal:</strong> ${selectedArticulo.precio * cantidad}
                        </Typography>

                        <Button
                          variant="contained"
                          onClick={handleAddDetail}
                          startIcon={<Package />}
                          fullWidth
                          sx={{ mb: 2 }}
                        >
                          Agregar Artículo
                        </Button>
                      </>
                    )}

                    {orderDetails.length > 0 && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleGenerateOrder}
                        startIcon={<DollarSign />}
                        fullWidth
                      >
                        Generar Orden de Compra
                      </Button>
                    )}
                  </Box>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={5}>
              {selectedProveedor && orderDetails.length > 0 && (
                <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: 20 }}>
                  <Typography variant="h5" gutterBottom>Resumen de la Orden</Typography>
                  <Typography><strong>Proveedor:</strong> {selectedProveedor.razonSocial || `${selectedProveedor.apellido}, ${selectedProveedor.nombre}`}</Typography>
                  <Typography><strong>CUIT:</strong> {selectedProveedor.cuit}</Typography>
                  <Typography><strong>Fecha:</strong> {new Date().toLocaleDateString()}</Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <List>
                    {orderDetails.map((detail, index) => (
                      <ListItem key={index} sx={{ display: 'block' }}>
                        <Typography>
                          {detail.articulo.codigo} - {detail.articulo.descripcion}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {detail.cantidad} x ${detail.precio} = ${detail.subtotal}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                  
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h5">
                    <strong>Total:</strong> ${orderDetails.reduce((sum, detail) => sum + detail.subtotal, 0)}
                  </Typography>
                </Paper>
              )}
            </Grid>
          </Grid>
        </Box>
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

export default OrderForm;