import React, { useState } from 'react';

// Define the type for the props
interface PlayerCreationProps {
    createPlayer: () => void; // Function to handle hosting
    gameId : string;
}

const PlayerCreation: React.FC<PlayerCreationProps> = ({ createPlayer, gameId }) => {
  const [nameInput, setNameInput] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/[^a-zA-Z0-9\s]/g, '')
    setNameInput(newValue);
  };

  const handleSubmit = async () => {
    try {
      await createPlayer(gameId, nameInput);
      setNameInput(""); // Clear input field
    } catch (error) {
      console.error("Error creating player:", error);
    }
  };

  return (
    <div>
      <h4>Game: {gameId}</h4>
      <h2>Enter name:</h2>
      <input type="text" value={nameInput} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default PlayerCreation;