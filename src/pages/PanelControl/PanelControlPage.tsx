import React from 'react';
import PanelControl from '../../components/Panel/PanelControl';
import PageHeader from '../../components/Header/PageHeader';

const PanelControlPage: React.FC = () => {

  return (
    <>
    <PageHeader
      backgroundImage="/images/bg_3.jpg"
      title="Inicia Sesión"
      />
      <PanelControl />
    </>
  );
};

export default PanelControlPage;
