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
  Card,
  CardContent,
  Snackbar,
  Alert,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { ShoppingCart, Package } from 'lucide-react';
import { Proveedor } from '../../types/Proveedor';
import { newArticulo } from '../../types/ArticleProps';
import ProveedorService from '../../services/ProveedorService';
import ArticleService from '../../services/ArticleService';

const NewArticle = () => {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [selectedProveedor, setSelectedProveedor] = useState<Proveedor | null>(null);
  const [value, setValue] = useState('');
  const [selectedMoto, setSelectedMoto] = useState<boolean>(false);
  const [marca, setMarca] = useState<string>();
  const [modelo, setModelo] = useState<string>();
  const [descripcion, setDescripcion] = useState<string>();
  const [precio, setPrecio] = useState<number>();
  const [cantidad, setCantidad] = useState(1);
  const [nroMotor, setNroMotor] = useState<number | undefined>();
  const [nroChasis, setNroChasis] = useState<number | undefined>();
  const [año, setAño] = useState<number | undefined>();
  const [cilindrada, setCilindrada] = useState<string | undefined>();


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



  const handleGenerateArticle = async () => {
    
    const article: newArticulo = {
      idProveedor: selectedProveedor?.id,
      marca: marca ?? '',
      modelo: modelo ?? '',
      descripcion: descripcion ?? '',
      precio: precio ?? 1,
      stockActual: cantidad,
      nroMotor: nroMotor,
      nroChasis: nroChasis,
      año: año,
      cilindrada: cilindrada
    };

    try {
        await ArticleService.CreateArticles(article);
        setSuccessMessage('El articulo fue generado exitosamente');
        // Reset form
        setSelectedProveedor(null);
        setCantidad(1);
    } catch (error) {
      console.error('Error:', error);
      setError('Error al intentar insertar un nuevo articulo');
    }
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    value === 'moto' ? setSelectedMoto(true) : setSelectedMoto(false);
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
            <Grid item xs={12} md={12}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ShoppingCart size={32} />
                  Nuevo Articulo
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
                    <InputLabel>Ingrese información del articulo:</InputLabel>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          type="text"
                          label="Marca"
                          value={marca}
                          onChange={(e) => setMarca(e.target.value)}
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          type="text"
                          label="Modelo"
                          value={modelo}
                          onChange={(e) => setModelo(e.target.value)}
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          type="text"
                          label="Descripción"
                          value={descripcion}
                          onChange={(e) => setDescripcion(e.target.value)}
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          type="number"
                          label="Cantidad"
                          value={cantidad}
                          onChange={(e) => setCantidad(Number(e.target.value))}
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          type="number"
                          label="Precio"
                          value={precio}
                          onChange={(e) => setPrecio(Number(e.target.value))}
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          defaultValue="moto"
                          onChange={handleRadioChange}
                        >
                          <FormControlLabel 
                            value="moto" 
                            control={<Radio />} 
                            label="Moto" />
                          <FormControlLabel 
                            value="repuesto" 
                            control={<Radio />} 
                            label="Repuesto" />
                        </RadioGroup>
                      </Grid>
                      {!selectedMoto && (
                        <>
                          <Grid item xs={12} md={6}>
                            <TextField
                              fullWidth
                              type="number"
                              label="N° Motor"
                              value={nroMotor}
                              onChange={(e) => setNroMotor(Number(e.target.value))}
                              sx={{ mb: 2 }}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              fullWidth
                              type="number"
                              label="N° Chasis"
                              value={nroChasis}
                              onChange={(e) => setNroChasis(Number(e.target.value))}
                              sx={{ mb: 2 }}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              fullWidth
                              type="number"
                              label="Año"
                              value={año}
                              onChange={(e) => setAño(Number(e.target.value))}
                              sx={{ mb: 2 }}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              fullWidth
                              type="text"
                              label="Cilindrada"
                              value={cilindrada}
                              onChange={(e) => setCilindrada(e.target.value)}
                              sx={{ mb: 2 }}
                            />
                          </Grid>
                        </>
                      )}
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          onClick={handleGenerateArticle}
                          startIcon={<Package />}
                          fullWidth
                          sx={{ mb: 2 }}
                        >
                          Agregar Artículo
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Paper>
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

export default NewArticle;