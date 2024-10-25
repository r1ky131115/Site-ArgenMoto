import React from 'react';
import { DirectionsCar, Handshake, Sell } from '@mui/icons-material';

const ServicesSection: React.FC = () => {
    const services = [
    {
        icon: <DirectionsCar fontSize="large" color="action" />,
        title: 'Venta',
        description: 'Ofrecemos una amplia variedad de vehículos nuevos y usados, adaptados a tus necesidades y presupuesto.',
    },
    {
        icon: <Sell fontSize="large" color="action" />,
        title: 'Post-Venta',
        description: 'Brindamos asistencia y soporte continuo para garantizar tu satisfacción y el óptimo rendimiento de tu vehículo.',
    },
    {
        icon: <Handshake fontSize="large" color="action" />,
        title: 'Atención continua',
        description: 'Nuestro equipo está disponible para resolver cualquier consulta y ofrecerte asesoría en todo momento.',
    },
    ];

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
          {services.map((service, index) => (
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
