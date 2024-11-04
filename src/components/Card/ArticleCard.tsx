import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { ArticleProps } from '../../types/ArticleProps';
import VehicleDetailModal from '../Modal/VehicleDetailModal';

const ArticleCard: React.FC<{
  vehicle: ArticleProps;
  onBookNow: () => void;
  onViewDetails: () => void;
}> = ({ vehicle, onBookNow, onViewDetails }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    onViewDetails(); // Si necesitas mantener la función onViewDetails por alguna razón
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card>
        <CardMedia
          sx={{ height: 180 }}
          image={`images/Moto/${vehicle.marca}/image_1.jpg`}
          title={vehicle.marca}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {vehicle.marca} {vehicle.modelo}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {vehicle.descripcion}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.primary' }}>
            Precio: ${vehicle.precio}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={onBookNow}>
            Comprar
          </Button>
          <Button size="small" onClick={handleOpenModal}>
            Ver más
          </Button>
        </CardActions>
      </Card>

      <VehicleDetailModal
        vehicle={vehicle}
        open={isModalOpen}
        onClose={handleCloseModal}
        onBookNow={onBookNow}
      />
    </>
  );
};

export default ArticleCard;