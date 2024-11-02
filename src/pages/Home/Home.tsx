import React, { useEffect, useState } from 'react';
import HeroSection from '../../components/Hero/HeroSection';
import BookingSection from '../../components/Booking/BookingSection';
import FeaturedVehiclesSection from '../../components/Sections/FeaturedVehiclesSection';
import AboutSection from '../../components/Sections/AboutSection';
import '../../index.css';
import ServicesSection from '../../components/Sections/ServicesSection';
import CounterSection from '../../components/Sections/CounterSection';
import { ArticleProps } from '../../types/ArticleProps';
import ArticleService from '../../services/ArticleService';

const Home: React.FC = () => {
  const [vehicles, setVehicles] = useState<ArticleProps[]>([]);
  
  const handleBookNow = (id: number) => {
    console.log(`Booking vehicle ${id}`);
  };
 
  const handleViewDetails = (id: number) => {
    console.log(`Viewing details for vehicle ${id}`);
  };
  

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articles = await ArticleService.getArticles();
        setVehicles(articles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <>
      <HeroSection />
      <BookingSection />
      <FeaturedVehiclesSection
        vehicles={vehicles}
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