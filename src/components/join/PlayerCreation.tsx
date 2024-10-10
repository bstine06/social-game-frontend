import React, { useState } from 'react';
import { createPlayerApi } from '../../api/playerApi';
import validator from 'validator';

// Define the type for the props
interface PlayerCreationProps {
    onCreatePlayer: () => void; // Function to handle hosting
    gameId : string;
}

const PlayerCreation: React.FC<PlayerCreationProps> = ({ onCreatePlayer, gameId }) => {
  const [nameInput, setNameInput] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setNameInput(newValue);
  };

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
      <h4>Game: {gameId}</h4>
      <h2>Enter name:</h2>
      <input type="text" className="big-input" value={nameInput} onChange={handleInputChange} />
      <button className="big-button" onClick={handleSubmit}>Submit</button>
    </div>
    </>
  );
};

export default PlayerCreation;