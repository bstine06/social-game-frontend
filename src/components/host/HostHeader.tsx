import React, { useState } from "react";
import ConfirmModal from '../ConfirmModal';
import { deleteGameApi } from '../../api/gameApi';
import '../../header.css';

interface HostHeaderProps {
  onCancelHost: () => void;
  gameId: string;
}

const HostHeader: React.FC<HostHeaderProps> = ({ onCancelHost, gameId }) => {
  const [isBackModalOpen, setIsBackModalOpen] = useState<boolean>(false);

  const handleBackSubmit = async () => {
    setIsBackModalOpen(true);
  };

  const handleBackConfirm = async () => {
    try {
      await deleteGameApi(gameId);
      setIsBackModalOpen(false); // Close modal
      onCancelHost(); //Notify parent that the game is cancelled
    } catch (error) {
      console.error("Error deleting game", error);
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
      <p>HOST</p>
      <p>{gameId}</p>
    </div>
      {isBackModalOpen && (
        <ConfirmModal
          message="Are you sure want to go back?"
          content={`This will delete your game (${gameId}).`}
          confirmText="Yes, delete"
          cancelText="No, don't delete my game!"
          onConfirm={handleBackConfirm}
          onCancel={handleBackCancel}
        />
      )}
    </>
  );
};

export default HostHeader;
