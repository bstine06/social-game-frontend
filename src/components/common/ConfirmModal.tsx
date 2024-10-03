import React, { useState } from "react";
import "../../styles/modal.css";

interface ConfirmModalProps {
  message: string;
  content: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  content,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) => {

  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <p>
          <strong>{content}</strong>
        </p>
        <button onClick={onConfirm}>{confirmText}</button>
        <button onClick={onCancel}>{cancelText}</button>
      </div>
    </div>
  );
};

export default ConfirmModal;
