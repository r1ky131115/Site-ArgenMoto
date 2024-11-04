import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Grid,
} from '@mui/material';
import {
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { ArticleProps } from '../../types/ArticleProps';

interface VehicleDetailModalProps {
  vehicle: ArticleProps;
  open: boolean;
  onClose: () => void;
  onBookNow: () => void;
}

const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  vehicle,
  open,
  onClose,
  onBookNow
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const totalImages = 3; // Número total de imágenes en el carrusel

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % totalImages);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="vehicle-detail-modal"
      aria-describedby="vehicle-detail-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 1000,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          maxHeight: '90vh',
          overflow: 'auto',
        }}
      >
        {/* Header con botón de cerrar */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <IconButton onClick={onClose} aria-label="cerrar">
            <CloseIcon />
          </IconButton>
        </Box>

        <Grid container spacing={3}>
          {/* Carrusel de imágenes */}
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative' }}>
              <Box
                component="img"
                sx={{
                  width: '100%',
                  height: 400,
                  objectFit: 'cover',
                  borderRadius: 1,
                }}
                src={`images/Moto/${vehicle.marca}/image_${currentImageIndex + 1}.jpg`}
                alt={`${vehicle.marca} ${vehicle.modelo}`}
              />
              <IconButton
                sx={{
                  position: 'absolute',
                  left: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
                }}
                onClick={handlePrevImage}
              >
                <ArrowBackIcon />
              </IconButton>
              <IconButton
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
                }}
                onClick={handleNextImage}
              >
                <ArrowForwardIcon />
              </IconButton>
            </Box>
            {/* Indicadores de imagen */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              {Array.from({ length: totalImages }).map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: currentImageIndex === index ? 'primary.main' : 'grey.300',
                    mx: 0.5,
                    cursor: 'pointer',
                  }}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </Box>
          </Grid>

          {/* Información del vehículo */}
          <Grid item xs={12} md={6}>
            <Card elevation={0}>
              <CardContent>
                <Typography variant="h4" component="h2" gutterBottom>
                  {vehicle.marca} {vehicle.modelo}
                </Typography>
                <Typography variant="h5" color="primary" gutterBottom>
                  ${vehicle.precio}
                </Typography>
                <Typography variant="body1" paragraph>
                  {vehicle.descripcion}
                </Typography>
                {/* Aquí puedes agregar más detalles del vehículo */}
                <Typography variant="body2" color="text.secondary">
                  Cilindrada: {vehicle.cilindrada}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Año: {vehicle.año}
                </Typography>
                {/* Agrega más especificaciones según tu modelo de datos */}
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={onBookNow}
                  sx={{ mt: 2 }}
                >
                  Comprar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default VehicleDetailModal;