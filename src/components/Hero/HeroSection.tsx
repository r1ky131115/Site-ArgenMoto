import React from 'react';
import useAnimateOnScroll from '../../hooks/useAnimateOnScroll';
import '../../styles/animation.css'

interface HeroSectionProps {
  backgroundImage?: string;
  title?: string;
  description?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImage = '/images/bg_1.jpg',
  title = 'Una Forma rápida y fácil de comprar un vehículo',
  description = 'Nuestra pasión por la movilidad y la excelencia nos impulsa a ofrecerte solo lo mejor. Explora nuestra amplia gama de autos y encuentra el compañero perfecto para tus aventuras. Confiabilidad, innovación y un servicio excepcional te esperan. ¡Tu próximo viaje comienza aquí!'
}) => {

  const servicesRef = useAnimateOnScroll<HTMLDivElement>();

  return (
    <div 
      className="hero-wrap ftco-degree-bg"
      style={{ backgroundImage: `url(${backgroundImage})` }}
      data-stellar-background-ratio="0.5"
    >
      <div className="overlay"></div>
      <div className="container">
        <div className="row no-gutters slider-text justify-content-start align-items-center justify-content-center">
          <div ref={servicesRef} className="col-lg-8 ftco-animate">
            <div className="text w-100 text-center mb-md-5 pb-md-5">
              <h1 className="mb-4">{title}</h1>
              <p style={{ fontSize: '18px' }}>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;