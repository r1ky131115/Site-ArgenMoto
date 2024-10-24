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
            style={{ backgroundImage: `url('/images/about.jpg')` }}
          >
          </div>
          
          <div ref={servicesRef} className="col-md-6 wrap-about ftco-animate">
            <div className="heading-section heading-section-white pl-md-5">
              <span className="subheading">Sobre nosotros</span>
              <h2 className="mb-4">Welcome to ArgenMoto</h2>
              
              <p>
                A small river named Duden flows by their place and supplies it with the necessary regelialia. 
                It is a paradisematic country, in which roasted parts of sentences fly into your mouth.
              </p>
              
              <p>
                On her way she met a copy. The copy warned the Little Blind Text, that where it came from it 
                would have been rewritten a thousand times and everything that was left from its origin 
                would be the word "and" and the Little Blind Text should turn around and return to its own, 
                safe country. A small river named Duden flows by their place and supplies it with the 
                necessary regelialia. It is a paradisematic country, in which roasted parts of sentences 
                fly into your mouth.
              </p>
              
              <p>
                <NavLink 
                    to="/" 
                    className="btn btn-primary py-2 px-3"
                >
                    Search Vehicle
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