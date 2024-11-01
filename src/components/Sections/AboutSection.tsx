import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/animation.css'
import useAnimateOnScroll from '../../hooks/useAnimateOnScroll';

const AboutSection: React.FC = () => {

    const servicesRef = useAnimateOnScroll<HTMLDivElement>();

  return (
    <section className="ftco-section ftco-about">
      <div className="container">
        <div className="row no-gutters">
          <div
            className="col-md-6 p-md-5 img img-2 d-flex justify-content-center align-items-center"
            style={{ backgroundImage: `url('/images/image_6.jpg')` }}
          >
          </div>
          
          <div ref={servicesRef} className="col-md-6 wrap-about ftco-animate">
            <div className="heading-section heading-section-white pl-md-5">
              <span className="subheading">Sobre nosotros</span>
              <h2 className="mb-4">Bienvenido a ArgenMoto</h2>
              
              <p>
                cada vehículo cuenta una historia y cada viaje comienza con un sueño. 
                Nuestra pasión por la movilidad y la excelencia nos impulsa a ofrecerte solo lo mejor. 
                Explora nuestra amplia gama de autos y encuentra el compañero perfecto para tus aventuras. 
                Confiabilidad, innovación y un servicio excepcional te esperan. 
              </p>
              
              <p>
                ¡Tu próximo viaje comienza aquí!
              </p>
              
              <p>
                <NavLink 
                    to="/" 
                    className="btn btn-primary py-2 px-3"
                >
                    Search ArticleProps
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;