import HeroSection from '../../components/Hero/HeroSection';
import BookingSection from '../../components/Booking/BookingSection';
import FeaturedVehiclesSection from '../../components/Sections/FeaturedVehiclesSection';
import { ListOfVehicles } from "../../utils/Mock/mockVehicles";
import AboutSection from '../../components/Sections/AboutSection';
import '../../index.css';
import ServicesSection from '../../components/Sections/ServicesSection';
import CounterSection from '../../components/Sections/CounterSection';

const Home: React.FC = () => {
  const handleBookNow = (id: number) => {
    console.log(`Booking vehicle ${id}`);
  };
 
  const handleViewDetails = (id: number) => {
    console.log(`Viewing details for vehicle ${id}`);
  };

  return (
    <>
      <HeroSection />
      <BookingSection />
      <FeaturedVehiclesSection
        vehicles={ListOfVehicles}
        onBookNow={handleBookNow}
        onViewDetails={handleViewDetails}
      />
      <AboutSection />
      <ServicesSection />
      <CounterSection />
    </>
  );
};

export default Home;