import { useState } from 'react';
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
} from '@mui/material';
import { ShoppingCart, Package, DollarSign } from 'lucide-react';

interface Product {
  type: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface Provider {
  id: string;
  name: string;
  address: string;
  contact: string;
}

const OrderForm = () => {
  const [providers] = useState<Provider[]>([
    { id: '1', name: 'Proveedor A', address: 'Calle Falsa 123', contact: '123-4567' },
    { id: '2', name: 'Proveedor B', address: 'Avenida Siempreviva 742', contact: '987-6543' },
    { id: '3', name: 'Proveedor C', address: 'Calle Luna 321', contact: '456-7890' },
  ]);

  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [productType, setProductType] = useState('');
  const [quantity, setQuantity] = useState(0);

  const unitPrices: { [key: string]: number } = {
    productA: 10,
    productB: 20,
    productC: 15,
  };

  const calculateTotalPrice = () => unitPrices[productType] * quantity;

  const handleAddProduct = () => {
    if (!productType || quantity <= 0) return;
    
    const unitPrice = unitPrices[productType] || 0;
    const newProduct: Product = {
      type: productType,
      quantity,
      unitPrice,
      totalPrice: calculateTotalPrice(),
    };
    setProducts([...products, newProduct]);
    setProductType('');
    setQuantity(0);
  };

  const handleGenerateOrder = async () => {
    const orderDate = new Date().toLocaleDateString();
    const totalAmount = products.reduce((sum, product) => sum + product.totalPrice, 0);

    const orderData = {
      provider: selectedProvider,
      date: orderDate,
      products,
      total: totalAmount,
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) {
        throw new Error('Error al generar la orden de compra');
      }
      alert("Orden generada con éxito");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ShoppingCart size={32} />
              Orden de Compra
            </Typography>

            {!selectedProvider ? (
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Seleccionar Proveedor</InputLabel>
                <Select
                  label="Seleccionar Proveedor"
                  onChange={(e) => {
                    const provider = providers.find((p) => p.id === e.target.value);
                    setSelectedProvider(provider || null);
                  }}
                >
                  {providers.map((provider) => (
                    <MenuItem key={provider.id} value={provider.id}>
                      {provider.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Proveedor Seleccionado</Typography>
                <Typography><strong>Nombre:</strong> {selectedProvider.name}</Typography>
                <Typography><strong>Dirección:</strong> {selectedProvider.address}</Typography>
                <Typography><strong>Contacto:</strong> {selectedProvider.contact}</Typography>
              </Paper>
            )}

            {selectedProvider && (
              <Box sx={{ mt: 3 }}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Tipo de Producto</InputLabel>
                  <Select
                    value={productType}
                    label="Tipo de Producto"
                    onChange={(e) => setProductType(e.target.value)}
                  >
                    <MenuItem value="productA">Producto A</MenuItem>
                    <MenuItem value="productB">Producto B</MenuItem>
                    <MenuItem value="productC">Producto C</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  type="number"
                  label="Cantidad"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  sx={{ mb: 2 }}
                />

                <Typography sx={{ mb: 2 }}>
                  <strong>Precio Unitario:</strong> ${unitPrices[productType] || 0}
                </Typography>

                <Typography sx={{ mb: 2 }}>
                  <strong>Precio Total:</strong> ${calculateTotalPrice()}
                </Typography>

                <Button
                  variant="contained"
                  onClick={handleAddProduct}
                  startIcon={<Package />}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Agregar Producto
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleGenerateOrder}
                  startIcon={<DollarSign />}
                  fullWidth
                >
                  Generar Orden de Compra
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          {selectedProvider && products.length > 0 && (
            <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: 20 }}>
              <Typography variant="h5" gutterBottom>Resumen de la Orden</Typography>
              <Typography><strong>Proveedor:</strong> {selectedProvider.name}</Typography>
              <Typography><strong>Dirección:</strong> {selectedProvider.address}</Typography>
              <Typography><strong>Fecha:</strong> {new Date().toLocaleDateString()}</Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <List>
                {products.map((product, index) => (
                  <ListItem key={index} sx={{ display: 'block' }}>
                    <Typography>
                      {product.type} - {product.quantity} x ${product.unitPrice} = ${product.totalPrice}
                    </Typography>
                  </ListItem>
                ))}
              </List>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="h6">
                <strong>Total:</strong> ${products.reduce((sum, product) => sum + product.totalPrice, 0)}
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderForm;