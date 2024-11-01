import React from 'react';
import './SuccessModal.css';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="success-icon">✓</div>
        <h2>{message}</h2>
        <button className="modal-button" onClick={onClose}>
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;