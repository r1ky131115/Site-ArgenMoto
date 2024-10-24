import React from 'react';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

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
    { text: "About", url: "#" },
    { text: "Services", url: "#" },
    { text: "Term and Conditions", url: "#" },
    { text: "Best Price Guarantee", url: "#" },
    { text: "Privacy & Cookies Policy", url: "#" }
  ];

  const customerSupportLinks: InfoLink[] = [
    { text: "FAQ", url: "#" },
    { text: "Payment Option", url: "#" },
    { text: "Booking Tips", url: "#" },
    { text: "How it works", url: "#" },
    { text: "Contact Us", url: "#" }
  ];

  const contactInfo: ContactInfo = {
    address: "203 Fake St. Mountain View, San Francisco, California, USA",
    phone: "+2 392 3929 210",
    email: "info@yourdomain.com"
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
                  Car<span>book</span>
                </a>
              </h2>
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
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
              <h2 className="ftco-heading-2">Information</h2>
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
              <h2 className="ftco-heading-2">Customer Support</h2>
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
              <h2 className="ftco-heading-2">Have a Questions?</h2>
              <div className="block-23 mb-3">
                <ul>
                  <li>
                    <span className="icon icon-map-marker"></span>
                    <span className="text">{contactInfo.address}</span>
                  </li>
                  <li>
                    <a href={`tel:${contactInfo.phone}`}>
                      <span className="icon icon-phone"></span>
                      <span className="text">{contactInfo.phone}</span>
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${contactInfo.email}`}>
                      <span className="icon icon-envelope"></span>
                      <span className="text">{contactInfo.email}</span>
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