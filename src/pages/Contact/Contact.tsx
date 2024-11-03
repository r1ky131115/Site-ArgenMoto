import React from 'react';
import PageHeader from '../../components/Header/PageHeader';
import Contacto from '../../components/Contact/Contact';

const Contact: React.FC = () => {

  const breadcrumbs = [
    { text: 'Inicio', url: '/' },
    { text: 'Contacto', url: '/contact' }
  ];

  return (
    <>
      <PageHeader
        backgroundImage="/images/bg_3.jpg"
        title="Contáctenos"
        breadcrumbs={breadcrumbs}
      />
      <Contacto />
    </>
  );
};

export default Contact;