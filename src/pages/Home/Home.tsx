import HeroSection from '../../components/Hero/HeroSection';
import BookingSection from '../../components/Booking/BookingSection';
import FeaturedVehiclesSection from '../../components/Sections/FeaturedVehiclesSection';
import { ListOfVehicles } from "../../utils/Mock/mockVehicles";
import AboutSection from '../../components/Sections/AboutSection';
import '../../index.css';
import ServicesSection from '../../components/Sections/ServicesSection';
import CounterSection from '../../components/Sections/CounterSection';
import Footer from '../../components/Footer/Footer';

const Home: React.FC = () => {
  const handleBookNow = (id: number) => {
    console.log(`Booking vehicle ${id}`);
  };
 
  const handleViewDetails = (id: number) => {
    console.log(`Viewing details for vehicle ${id}`);
  };

  return (
    <>
      <HeroSection
        backgroundImage="/images/bg_1.jpg"
        title="Fast & Easy Way To Rent A Car"
        description="A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts"
      />
      <BookingSection />
      <FeaturedVehiclesSection
        vehicles={ListOfVehicles}
        onBookNow={handleBookNow}
        onViewDetails={handleViewDetails}
      />
      <AboutSection />
      <ServicesSection />
      <CounterSection />
      <Footer />
    </>
  );
};

export default Home;