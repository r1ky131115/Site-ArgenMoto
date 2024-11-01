import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ArticleProps } from '../../types/ArticleProps';

// Componente de tarjeta individual
const ArticleCard: React.FC<{

    vehicle: ArticleProps;
    onBookNow: () => void;
    onViewDetails: () => void;
  }> = ({ vehicle, onBookNow, onViewDetails }) => {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 180 }}
        image='images/image_2.jpg'
        // image={vehicle.imageUrl}
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
        <Button size="small" onClick={onBookNow}>Comprar</Button>
        <Button size="small" onClick={onViewDetails}>Ver más</Button>
      </CardActions>
    </Card>
  );
};

export default ArticleCard;
