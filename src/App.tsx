import React, { useState, useEffect } from 'react';
import Loader from './components/Loader/Loader'; // Asegúrate de importar tu componente Loader correctamente
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/Hero/HeroSection';
import BookingSection from './components/Booking/BookingSection';
import FeaturedVehiclesSection from './components/Sections/FeaturedVehiclesSection';

import { ListOfVehicles } from "./utils/Mock/mockVehicles"

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const handleBookNow = (id: number) => {
    console.log(`Booking vehicle ${id}`);
  };
  
  const handleViewDetails = (id: number) => {
    console.log(`Viewing details for vehicle ${id}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
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
        </>
      )}
    </div>
  );
};

export default App;
