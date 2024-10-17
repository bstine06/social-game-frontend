import React, { useState } from 'react';
import { createPlayerApi } from '../../api/playerApi';
import validator from 'validator';
import LilGuySelect from './LilGuySelect';
import NameInput from './NameInput';

// Define the type for the props
interface PlayerCreationProps {
    onCreatePlayer: () => void; // Function to handle hosting
    gameId : string;
}

const PlayerCreation: React.FC<PlayerCreationProps> = ({ onCreatePlayer, gameId }) => {
  const [stage, setStage] = useState<string>("lilGuySelect");
  const [nameInput, setNameInput] = useState<string>("");
  const [lilGuyShape, setLilGuyShape] = useState<number | null>(null);
  const [lilGuyColor, setLilGuyColor] = useState<string>("");

  const advanceStage = () => {
    setStage("lilGuySelect");
  }

  const handleSubmit = async () => {
    try {
      const sanitizedInput = validator.escape(nameInput); // Escapes any potentially harmful characters
      await createPlayerApi(gameId, sanitizedInput);
      setNameInput(""); // Clear input field
      onCreatePlayer(); //Notify parent of player creation
    } catch (error) {
      console.error("Error creating player:", error);
    }
  };

  return (
    <>
    <div className="container">
      {stage=="nameInput" && <NameInput onNext={advanceStage}/>}
      {stage=="lilGuySelect" && <LilGuySelect/>}
    </div>
    </>
  );
};

export default PlayerCreation;