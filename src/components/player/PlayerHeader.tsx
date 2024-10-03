import React, { useState } from "react";
import ConfirmModal from '../ConfirmModal';
import { deletePlayerApi } from '../../api/playerApi';
import '../../header.css';

interface PlayerHeaderProps {
  onCancelPlayer: () => void;
  gameId: string;
  playerName: string;
}

const PlayerHeader: React.FC<PlayerHeaderProps> = ({ onCancelPlayer, gameId, playerName }) => {
  const [isBackModalOpen, setIsBackModalOpen] = useState<boolean>(false);

  const handleBackSubmit = async () => {
    setIsBackModalOpen(true);
  };

  const handleBackConfirm = async () => {
    try {
      await deletePlayerApi();
      setIsBackModalOpen(false); // Close modal
      onCancelPlayer(); //Notify parent that the player is cancelled
    } catch (error) {
      console.error("Error deleting player", error);
    }
  };

  const handleBackCancel = () => {
    // Close the modal without submitting
    setIsBackModalOpen(false);
  };

  return (
    <>
    <div className="header">
      <button onClick={handleBackSubmit}>EXIT</button>
      <p>{playerName}</p>
      <p>{gameId ? gameId : ""}</p>
    </div>
      {isBackModalOpen && (
        <ConfirmModal
          message="Are you sure want to exit?"
          content={`This will permanently remove you from the game (${gameId})`}
          confirmText="Yes, remove me from the game"
          cancelText="No, don't remove me!"
          onConfirm={handleBackConfirm}
          onCancel={handleBackCancel}
        />
      )}
    </>
  );
};

export default PlayerHeader;