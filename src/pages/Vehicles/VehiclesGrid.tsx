import PageHeader from '../../components/Header/PageHeader';
import VehicleGrid from '../../components/Sections/VehicleCardSection';
import '../../index.css';

const VehiclesGrid: React.FC = () => {
  const handleBookNow = (id: number) => {
    console.log(`Booking vehicle ${id}`);
  };
 
  const handleViewDetails = (id: number) => {
    console.log(`Viewing details for vehicle ${id}`);
  };
  
  const breadcrumbs = [
    { text: 'Inicio', url: '/' },
    { text: 'Vehiculos', url: '/vehicles' }
  ];

  return (
    <>
      <PageHeader
        backgroundImage="/images/bg_2.jpg"
        title="Nuestras Motos"
        breadcrumbs={breadcrumbs}
      />
      <VehicleGrid
        itemsPerPage={9}  // Opcional: por defecto es 9
        itemsPerRow={3}   // Opcional: por defecto es 3
        onBookNow={handleBookNow}
        onViewDetails={handleViewDetails}
      />
    </>
  );
};

export default VehiclesGrid;