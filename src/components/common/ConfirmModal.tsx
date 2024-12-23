import React, { useState } from "react";
import "../../styles/modal.css";

interface ConfirmModalProps {
  message: string;
  content: string;
  element?: React.ReactNode;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  content,
  element = null,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) => {

  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        {element ? <div style={{display: "flex", justifySelf: "center", maxWidth:"1200px"}}>{element}</div> : null}
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
