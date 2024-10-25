import React from 'react';
import { ListServices } from '../../utils/ListServiceSection';

const ServicesSection: React.FC = () => {
  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-md-7 text-center heading-section">
            <span className="subheading">Servicios</span>
            <h2 className="mb-3">Nuestros servicios</h2>
          </div>
        </div>
        <div className="row">
          {ListServices.map((service, index) => (
            <div className="col-md-4" key={index}>
              <div className="services services-2 w-100 text-center">
                <div className="icon d-flex align-items-center justify-content-center">
                  {service.icon}
                </div>
                <div className="text w-100">
                  <h3 className="heading mb-2">{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
