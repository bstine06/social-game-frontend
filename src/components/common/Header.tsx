import React, { useState } from "react";
import ConfirmModal from '../common/ConfirmModal';
import { deleteGameApi } from '../../api/gameApi';
import '../../styles/header.css';

interface HeaderProps {
  onCancel: () => void;
  gameId: string;
  playerName?: string;
  confirmModalContent: string;
}

const Header: React.FC<HeaderProps> = ({ onCancel, gameId, playerName, confirmModalContent }) => {
  const [isBackModalOpen, setIsBackModalOpen] = useState<boolean>(false);

  const handleBackSubmit = async () => {
    setIsBackModalOpen(true);
  };

  const handleBackConfirm = async () => {
    setIsBackModalOpen(false); // Close modal
    onCancel(); //Notify parent that the game is cancelled
  };

  const handleBackCancel = () => {
    // Close the modal without submitting
    setIsBackModalOpen(false);
  };

  return (
    <>
    <div className="header">
      <button onClick={handleBackSubmit}>EXIT</button>
      {playerName && <p>{playerName}</p>}
      {!playerName && <p>HOST</p>}
      <p>{gameId}</p>
    </div>
      {isBackModalOpen && (
        <ConfirmModal
          message="Are you sure want to exit?"
          content={confirmModalContent}
          confirmText="Yes, please exit"
          cancelText="No, don't exit"
          onConfirm={handleBackConfirm}
          onCancel={handleBackCancel}
        />
      )}
    </>
  );
};

export default Header;
