import React from 'react';
import TripForm from './TripForm';
import { Map, CalendarCheck, Bike } from 'lucide-react';
import useAnimateOnScroll from '../../hooks/useAnimateOnScroll';
import '../../styles/animation.css'

const BookingSection: React.FC = () => {
  const servicesRef = useAnimateOnScroll<HTMLDivElement>();

  return (
    <section className="ftco-section ftco-no-pt bg-light">
      <div className="container">
        <div className="row no-gutters">
          <div className="col-md-12 featured-top">
            <div className="row no-gutters">
              {/* Formulario */}
              <TripForm />

              {/* Servicios */}
              <div 
                ref={servicesRef}
                className="col-md-8 d-flex align-items-center ftco-animate"
                data-animate-effect="fadeInRight"
              >
                <div className="services-wrap rounded-right w-100">
                  <h3 className="heading-section mb-4">La mejor manera de comprar tu moto perfecta</h3>
                  <div className="row d-flex mb-4">
                    
                    <div ref={servicesRef} className="col-md-4 d-flex align-self-stretch">
                      <div className="services w-100 text-center">
                        <div className="icon d-flex align-items-center justify-content-center">
                          <Map size={ 24 } />
                        </div>
                        <div className="text w-100">
                          <h3 className="heading mb-2">Elige tu lugar para retirarla</h3>
                        </div>
                      </div>
                    </div>
                    
                    <div ref={servicesRef} className="col-md-4 d-flex align-self-stretch">
                      <div className="services w-100 text-center">
                        <div className="icon d-flex align-items-center justify-content-center">
                          <Bike size={ 24 } />
                        </div>
                        <div className="text w-100">
                          <h3 className="heading mb-2">Encuentra la moto ideal para ti</h3>
                        </div>
                      </div>
                    </div>
                    
                    <div ref={servicesRef} className="col-md-4 d-flex align-self-stretch">
                      <div className="services w-100 text-center">
                        <div className="icon d-flex align-items-center justify-content-center">
                          <CalendarCheck size={ 24 } />
                        </div>
                        <div className="text w-100">
                          <h3 className="heading mb-2">Reserva tu moto soñada hoy mismo</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;