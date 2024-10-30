// src/components/OrderForm/SuccessMessage.tsx

import React from 'react';
import './SuccessMessage.css';

interface SuccessMessageProps {
  message: string;
  onClose: () => void; // función para cerrar el mensaje
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, onClose }) => {
  return (
    <div className="success-message">
      <p>{message}</p>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default SuccessMessage;
