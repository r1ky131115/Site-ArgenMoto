import React from 'react';

interface HeroSectionProps {
  backgroundImage: string;
  title: string;
  description: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImage = '/api/placeholder/1920/1080',
  title = 'Fast & Easy Way To Rent A Car',
  description = 'A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts'
}) => {
  return (
    <div 
      className="hero-wrap ftco-degree-bg"
      style={{ backgroundImage: `url(${backgroundImage})` }}
      data-stellar-background-ratio="0.5"
    >
      <div className="overlay"></div>
      <div className="container">
        <div className="row no-gutters slider-text justify-content-start align-items-center justify-content-center">
          <div className="col-lg-8 ftco-animate">
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