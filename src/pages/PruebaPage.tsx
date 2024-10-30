// src/pages/PruebaPage/PruebaPage.tsx

import React from 'react';
import OrderForm from '../components/OrderForm/OrderForm';

const PruebaPage: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Prueba de Orden de Compra</h2>
      <OrderForm />
    </div>
  );
};

export default PruebaPage;
