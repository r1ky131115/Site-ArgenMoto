import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { FeaturedAticlesSectionProps } from "../../types/FeaturedAticlesSectionProps";
import ArticleCard from "../Card/ArticleCard";


const FeaturedVehiclesSection: React.FC<FeaturedAticlesSectionProps> = ({
  vehicles,
  onBookNow,
  onViewDetails
}) => {
  const options = {
    center: true,
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000, // Tiempo entre cada cambio (en milisegundos)
    smartSpeed: 600, // Velocidad de la transición de las imágenes
    items: 1,
    margin: 30,
    nav: false,
    dots: false, // Mostrar los indicadores o "dots"
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  };
  

  return (
    <section className="ftco-section ftco-no-pt bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 heading-section text-center mb-5">
            <span className="subheading">Nuestras ofertas!</span>
            <h2 className="mb-2">Motos destacadas</h2>
          </div>
        </div>
        <div className="row">
          {/* Implementación del carrusel */}
          <OwlCarousel className="owl-theme" {...options}>
            {vehicles.map((vehicle) => (
              <div className="item" key={vehicle.id}>
                <ArticleCard
                  vehicle={vehicle}
                  onBookNow={() => onBookNow(vehicle.id)} // Llama a onBookNow con el ID del vehículo
                  onViewDetails={() => onViewDetails(vehicle.id)} // Llama a onViewDetails con el ID del vehículo
                />
              </div>
            ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehiclesSection;
