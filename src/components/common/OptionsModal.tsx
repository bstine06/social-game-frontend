import React, { useState } from "react";
import "../../styles/modal.css";

interface OptionsModalProps {
  options: string[];
  onSelection: (selection: string) => void;
  onClose: () => void;
}

const OptionsModal: React.FC<OptionsModalProps> = ({ options, onSelection, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="big-button" onClick={onClose}>BACK</button>
        {options.map((option, i) => {
            return <button key={i} className="question-option" onClick={() => onSelection(option)}>{option}</button>
        })}
      </div>
    </div>
  );
};

export default OptionsModal;