import React, { useState, useEffect } from 'react';
import Loader from './components/Loader/Loader'; // Asegúrate de importar tu componente Loader correctamente
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/Hero/HeroSection';
import BookingSection from './components/Booking/BookingSection';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

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
        </>
      )}
    </div>
  );
};

export default App;
