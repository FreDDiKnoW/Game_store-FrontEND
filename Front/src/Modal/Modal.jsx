import React from 'react';
import './Modal.css';

function Modal({ message, onClose }) {
  if (!message) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h4>Повідомлення</h4>
        <p>{message}</p>
        <button onClick={onClose} className="modal-close-button">
          Закрити
        </button>
      </div>
    </div>
  );
}

export default Modal;