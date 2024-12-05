import React, { useState } from 'react';
import { createPlayerApi } from '../../api/playerApi';
import LilGuySelect from './LilGuySelect';
import NameInput from './NameInput';

// Define the type for the props
interface PlayerCreationProps {
    onCreatePlayer: () => void; // Function to handle hosting
    gameId : string;
}

const PlayerCreation: React.FC<PlayerCreationProps> = ({ onCreatePlayer, gameId }) => {
  const [stage, setStage] = useState<string>("nameInput");
  const [nameInput, setNameInput] = useState<string>("");

  const advanceStage = (name: string) => {
    setNameInput(name);
    setStage("lilGuySelect");
  }

  const handleSubmit = async (shape: number, color: string) => {
    try {
      await createPlayerApi(gameId, nameInput, shape, color);
      setNameInput(""); // Clear input field
      onCreatePlayer(); //Notify parent of player creation
    } catch (error) {
      console.error("Error creating player:", error);
    }
  };

  return (
    <>
    <div className="container thinner-container">
      {stage=="nameInput" && <NameInput onNext={advanceStage}/>}
      {stage=="lilGuySelect" && <LilGuySelect onSubmit={handleSubmit}/>}
    </div>
    </>
  );
};

export default PlayerCreation;