import React, { useState } from 'react';
import ConfirmModal from '../ConfirmModal';
import { createPlayerApi } from '../../api/playerApi';

// Define the type for the props
interface PlayerCreationProps {
    onCreatePlayer: () => void; // Function to handle hosting
    gameId : string;
}

const PlayerCreation: React.FC<PlayerCreationProps> = ({ onCreatePlayer, gameId }) => {
  const [nameInput, setNameInput] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/[^a-zA-Z0-9\s]/g, '')
    setNameInput(newValue);
  };

  const handleSubmit = async () => {
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    try {
      await createPlayerApi(gameId, nameInput);
      setNameInput(""); // Clear input field
      setIsModalOpen(false); // Close modal
      onCreatePlayer(); //Notify parent of player creation
    } catch (error) {
      console.error("Error creating player:", error);
    }
  }

  const handleCancel = () => {
    // Close the modal without submitting
    setIsModalOpen(false);
  };

  return (
    <>
    <div>
      <h4>Game: {gameId}</h4>
      <h2>Enter name:</h2>
      <input type="text" value={nameInput} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
    {/* Show the modal if there's input and the modal is open */}
    {isModalOpen && (
      <ConfirmModal 
        message="Are you sure want to use this name?"
        content={nameInput}
        confirmText="Yes, I'm sure"
        cancelText="No, take me back!"
        onConfirm={handleConfirm} 
        onCancel={handleCancel} 
      />
    )}
    </>
  );
};

export default PlayerCreation;