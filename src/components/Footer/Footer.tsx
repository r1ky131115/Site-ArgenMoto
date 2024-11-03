import React from 'react';
import { Facebook, Twitter, Instagram, MapIcon, Phone, Mail } from 'lucide-react';

interface SocialLink {
  icon: JSX.Element;
  url: string;
}

interface InfoLink {
  text: string;
  url: string;
}

interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}

const Footer: React.FC = () => {
  const socialLinks: SocialLink[] = [
    { icon: <Twitter fontSize="large" color="action" />, url: "#" },
    { icon: <Facebook fontSize="large" color="action" />, url: "#" },
    { icon: <Instagram fontSize="large" color="action" />, url: "#" }
  ];

  const informationLinks: InfoLink[] = [
    { text: "Inicio", url: "#" },
    { text: "Servicios", url: "#" },
    { text: "Terminos y condiciones", url: "#" },
    { text: "Privadicad & Politicas de cookies", url: "#" }
  ];

  const customerSupportLinks: InfoLink[] = [
    { text: "Preguntas frecuentes", url: "#" },
    { text: "Opciones de pago", url: "#" },
    { text: "Consejos para comprar", url: "#" },
    { text: "Trabaja con nosotros", url: "#" },
    { text: "Contáctanos", url: "#" }
  ];

  const contactInfo: ContactInfo = {
    address: "Av. Calchaquí 6200 (1888) Florencio Varela Buenos Aires, Argentina",
    phone: "+54 11 4275-6100",
    email: "infovirtual@unaj.edu.ar"
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="ftco-footer ftco-bg-dark ftco-section">
      <div className="container">
        <div className="row mb-5">
          {/* Company Info Column */}
          <div className="col-md">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">
                <a href="/" className="logo">
                  Argen<span>Moto</span>
                </a>
              </h2>
              <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
                {socialLinks.map((link, index) => (
                  <li key={index} className="ftco-animate">
                    <a href={link.url}>
                        {link.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Information Column */}
          <div className="col-md">
            <div className="ftco-footer-widget mb-4 ml-md-5">
              <h2 className="ftco-heading-2">Información</h2>
              <ul className="list-unstyled">
                {informationLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.url} className="py-2 d-block">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Customer Support Column */}
          <div className="col-md">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Atención al cliente</h2>
              <ul className="list-unstyled">
                {customerSupportLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.url} className="py-2 d-block">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info Column */}
          <div className="col-md">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Tienes preguntas?</h2>
              <div className="block-23 mb-3">
                <ul>
                  <li>
                    <a href={`tel:${contactInfo.address}`}>
                      <MapIcon />
                      <span className="text">&nbsp;{contactInfo.address}</span>
                    </a>
                  </li>
                  <li>
                    <a href={`tel:${contactInfo.phone}`}>
                      <Phone />
                      <span className="text">&nbsp;{contactInfo.phone}</span>
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${contactInfo.email}`}>
                      <Mail />
                      <span className="text">&nbsp;{contactInfo.email}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Row */}
        <div className="row">
          <div className="col-md-12 text-center">
            <p>
              Copyright &copy;{currentYear} All rights reserved | This template is made with{' '}
              <i className="icon-heart color-danger" aria-hidden="true"></i> by{' '}
              <a href="https://colorlib.com" target="_blank" rel="noopener noreferrer">
                Colorlib
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;