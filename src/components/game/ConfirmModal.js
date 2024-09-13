import React, { useState } from 'react';
import '../../modal.css';

function ConfirmModal({ content, onConfirm, onCancel }) {
  console.log("IN CONFIRM MODAL, ", content);
  if (!content) return null; // Don't render the modal if there's no content to confirm

  return (
    <div className="modal">
      <div className="modal-content">
        <p>Are you sure you want to submit this content?</p>
        <p><strong>{content}</strong></p>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default ConfirmModal;