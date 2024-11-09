import React, { useState } from 'react';
import { createPlayerApi } from '../../api/playerApi';
import validator from 'validator';
import LilGuySelect from './LilGuySelect';
import NameInput from './NameInput';

// Define the type for the props
interface PlayerCreationProps {
    onCreatePlayer: () => void; // Function to handle hosting
    gameId : string;
    onColorSelect: (color: string) => void;
}

const PlayerCreation: React.FC<PlayerCreationProps> = ({ onCreatePlayer, gameId, onColorSelect }) => {
  const [stage, setStage] = useState<string>("nameInput");
  const [nameInput, setNameInput] = useState<string>("");

  const advanceStage = (name: string) => {
    setNameInput(name);
    setStage("lilGuySelect");
  }

  const handleSubmit = async (shape: number, color: string) => {
    try {
      const sanitizedInput = validator.escape(nameInput); // Escapes any potentially harmful characters
      await createPlayerApi(gameId, sanitizedInput, shape, color);
      setNameInput(""); // Clear input field
      onCreatePlayer(); //Notify parent of player creation
    } catch (error) {
      console.error("Error creating player:", error);
    }
  };

  return (
    <>
    <div className="container auto-width">
      {stage=="nameInput" && <NameInput onNext={advanceStage}/>}
      {stage=="lilGuySelect" && <LilGuySelect onColorSelect={onColorSelect} onSubmit={handleSubmit}/>}
    </div>
    </>
  );
};

export default PlayerCreation;