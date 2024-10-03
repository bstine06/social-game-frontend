import React, { useState } from "react";
import "../../styles/modal.css";

interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose}>close</button>
      </div>
    </div>
  );
};

export default ErrorModal;