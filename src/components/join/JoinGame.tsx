import React, { useState, useEffect } from 'react';
import PlayerCreation from './PlayerCreation';
import { getGameByIdApi } from '../../api/gameApi';

// Define the type for the props
interface JoinGameProps {
    onCreatePlayer: () => void; // Function to handle hosting
    onCancelJoin: () => void;
}

const JoinGame: React.FC<JoinGameProps> = ({ onCreatePlayer, onCancelJoin }) => {
  const [gameIdInput, setGameIdInput] = useState<string>("");
  const [isValidInput, setIsValidInput] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleBackSubmit = async () => {
    onCancelJoin();
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/[^a-zA-Z0-9]/g, '')
    setGameIdInput(newValue);
  };

  const handleSubmit = async () => {
    try {
        const game = await getGameByIdApi(gameIdInput);
        setIsValidInput(true); // React schedules this update, but it's not immediate
        setErrorMessage("");   // Clear the error message if valid
    } catch (error) {
        setErrorMessage("Please enter a valid game ID.");
    }
  };
  
  const renderComponent = () : JSX.Element => {
    if (!isValidInput) {
        return (
            <div>
                <h2>Enter game id:</h2>
                <input type="text" maxLength={4} value={gameIdInput} onChange={handleInputChange} />
                <button onClick={handleSubmit}>Submit</button>
                <p className="error">{errorMessage}</p>
            </div>
        );
    } else {
        return (
            <PlayerCreation onCreatePlayer={onCreatePlayer} gameId={gameIdInput}/>
        );
    }
  };
  
  return (
    <>
    <button onClick={handleBackSubmit}>Back</button>
    {renderComponent()}
    </>
  );
};

export default JoinGame;