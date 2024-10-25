import PageHeader from '../../components/Header/PageHeader';
import VehicleGrid from '../../components/Sections/VehicleCardSection';
import { ListOfVehicles } from "../../utils/Mock/mockVehicles";
import '../../index.css';

const Motorcycles: React.FC = () => {
  const handleBookNow = (id: number) => {
    console.log(`Booking vehicle ${id}`);
  };
 
  const handleViewDetails = (id: number) => {
    console.log(`Viewing details for vehicle ${id}`);
  };
  
  const breadcrumbs = [
    { text: 'Home', url: '/' },
    { text: 'Motos', url: '/motos' }
  ];

  return (
    <>
      <PageHeader
        backgroundImage="/images/bg_3.jpg"
        title="Nuestras Motos"
        breadcrumbs={breadcrumbs}
      />
      <VehicleGrid
      vehicles={ListOfVehicles}
      itemsPerPage={9}  // Opcional: por defecto es 9
      itemsPerRow={3}   // Opcional: por defecto es 3
      onBookNow={handleBookNow}
      onViewDetails={handleViewDetails}
    />
    </>
  );
};

export default Motorcycles;