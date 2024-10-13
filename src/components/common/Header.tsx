import React, { useState } from "react";
import ConfirmModal from '../common/ConfirmModal';
import { deleteGameApi } from '../../api/gameApi';
import '../../styles/header.css';
import he from 'he';

interface HeaderProps {
  onCancel: () => void;
  gameId: string;
  role: string;
  playerName?: string;
  confirmModalContent: string;
}

const Header: React.FC<HeaderProps> = ({ onCancel, gameId, role, playerName, confirmModalContent }) => {
  const [isBackModalOpen, setIsBackModalOpen] = useState<boolean>(false);

  const handleBackSubmit = async () => {
    setIsBackModalOpen(true);
  };

  const handleBackConfirm = async () => {
    onCancel(); //Notify parent that the game is cancelled
    //setIsBackModalOpen(false); // Close modal
  };

  const handleBackCancel = () => {
    // Close the modal without submitting
    setIsBackModalOpen(false);
  };

  return (
    <>
    <div className="header">
      <button onClick={handleBackSubmit} className="small-button">EXIT</button>
      {role==="PLAYER" && playerName && <h2>{he.decode(playerName)}</h2>}
      {role==="HOST" && <h2>HOST</h2>}
      {role==="PLAYER_CREATION" && <h2>JOIN GAME</h2>}
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
