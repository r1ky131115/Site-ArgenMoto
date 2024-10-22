import React from 'react';
import NavbarToggleButton from '../Buttons/NavbarToggleButton';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
      <div className="container">
        <a className="navbar-brand" href="index.html">Argen<span>Moto</span></a>
        
        <NavbarToggleButton target="ftco-nav" />

        <div className="collapse navbar-collapse" id="ftco-nav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a href="index.html" className="nav-link">Inicio</a>
            </li>
            <li className="nav-item">
              <a href="about.html" className="nav-link">Sobre nosotros</a>
            </li>
            <li className="nav-item">
              <a href="services.html" className="nav-link">Servicios</a>
            </li>
            <li className="nav-item">
              <a href="car.html" className="nav-link">Motos</a>
            </li>
            <li className="nav-item">
              <a href="pricing.html" className="nav-link">Repuestos</a>
            </li>
            <li className="nav-item">
              <a href="contact.html" className="nav-link">Contacto</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
