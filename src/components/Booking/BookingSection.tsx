import React from 'react';
import { Map, Handshake, Car } from 'react-flaticons';
import useAnimateOnScroll from '../../hooks/useAnimateOnScroll';
import '../../styles/animation.css'

const BookingSection: React.FC = () => {
  const formRef = useAnimateOnScroll<HTMLFormElement>();
  const servicesRef = useAnimateOnScroll<HTMLDivElement>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica del submit
  };

  return (
    <section className="ftco-section ftco-no-pt bg-light">
      <div className="container">
        <div className="row no-gutters">
          <div className="col-md-12 featured-top">
            <div className="row no-gutters">
              {/* Formulario */}
              <div className="col-md-4 d-flex align-items-center">
                <form 
                  ref={formRef}
                  onSubmit={handleSubmit} 
                  className="request-form ftco-animate bg-primary"
                  data-animate-effect="fadeInLeft"
                >
                  <h2>Make your trip</h2>
                  <div className="form-group">
                    <label htmlFor="pickup" className="label">Pick-up location</label>
                    <input
                      type="text"
                      id="pickup"
                      className="form-control"
                      placeholder="City, Airport, Station, etc"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dropoff" className="label">Drop-off location</label>
                    <input
                      type="text"
                      id="dropoff"
                      className="form-control"
                      placeholder="City, Airport, Station, etc"
                    />
                  </div>
                  <div className="d-flex">
                    <div className="form-group mr-2">
                      <label htmlFor="book_pick_date" className="label">Pick-up date</label>
                      <input
                        type="date"
                        className="form-control"
                        id="book_pick_date"
                        placeholder="Date"
                      />
                    </div>
                    <div className="form-group ml-2">
                      <label htmlFor="book_off_date" className="label">Drop-off date</label>
                      <input
                        type="date"
                        className="form-control"
                        id="book_off_date"
                        placeholder="Date"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="time_pick" className="label">Pick-up time</label>
                    <input
                      type="time"
                      className="form-control"
                      id="time_pick"
                      placeholder="Time"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      value="Rent A Car Now"
                      className="btn btn-secondary py-3 px-4"
                    />
                  </div>
                </form>
              </div>

              {/* Servicios */}
              <div 
                ref={servicesRef}
                className="col-md-8 d-flex align-items-center ftco-animate"
                data-animate-effect="fadeInRight"
              >
                <div className="services-wrap rounded-right w-100">
                  <h3 className="heading-section mb-4">Better Way to Rent Your Perfect Cars</h3>
                  <div className="row d-flex mb-4">
                    {/* Servicio 1 */}
                    <div ref={servicesRef} className="col-md-4 d-flex align-self-stretch .item-animate">
                      <div className="services w-100 text-center">
                        <div className="icon d-flex align-items-center justify-content-center">
                          <Map size={24} />
                        </div>
                        <div className="text w-100">
                          <h3 className="heading mb-2">Choose Your Pickup Location</h3>
                        </div>
                      </div>
                    </div>
                    {/* Servicio 2 */}
                    <div ref={servicesRef} className="col-md-4 d-flex align-self-stretch .item-animate">
                      <div className="services w-100 text-center">
                        <div className="icon d-flex align-items-center justify-content-center">
                          <Handshake size={24} />
                        </div>
                        <div className="text w-100">
                          <h3 className="heading mb-2">Select the Best Deal</h3>
                        </div>
                      </div>
                    </div>
                    {/* Servicio 3 */}
                    <div ref={servicesRef} className="col-md-4 d-flex align-self-stretch .item-animate">
                      <div className="services w-100 text-center">
                        <div className="icon d-flex align-items-center justify-content-center">
                          <Car size={24} />
                        </div>
                        <div className="text w-100">
                          <h3 className="heading mb-2">Reserve Your Rental Car</h3>
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