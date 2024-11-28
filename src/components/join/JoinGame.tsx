import React, { useState, useEffect } from 'react';
import PlayerCreation from './PlayerCreation';
import { getGameByIdApi } from '../../api/gameApi';
import Header from '../common/Header';
import { GameData } from '../types/GameDataTypes';

// Define the type for the props
interface JoinGameProps {
    onCreatePlayer: () => void; // Function to handle hosting
    onCancelJoin: () => void;
    updateGameId: (newGameId: string) => void;
    gameData: GameData;
}

const JoinGame: React.FC<JoinGameProps> = ({
  onCreatePlayer,
  onCancelJoin,
  updateGameId,
  gameData
}) => {
  const [gameIdInput, setGameIdInput] = useState<string>("");
  const [isValidInput, setIsValidInput] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleBackSubmit = async () => {
    onCancelJoin();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    const newValue = event.target.value
      .replace(/[^a-zA-Z0-9]/g, "")
      .toUpperCase();
    setGameIdInput(newValue);
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const game = await getGameByIdApi(gameIdInput);
      setIsValidInput(true); // React schedules this update, but it's not immediate
      setErrorMessage(""); // Clear the error message if valid
      updateGameId(gameIdInput);
    } catch (error) {
      setErrorMessage("Please enter a valid game ID.");
      setGameIdInput("");
    }
  };

  const renderComponent = (): JSX.Element => {
    if (isValidInput) {
      return (
        <PlayerCreation onCreatePlayer={onCreatePlayer} gameId={gameIdInput} />
      );
    } else if (gameData.gameId) {
      return (
        <PlayerCreation onCreatePlayer={onCreatePlayer} gameId={gameData.gameId} />
      );
    } else {
      return (
        <div className="container thinner-container">
          <h2>game ID:</h2>
          <input
            id="game-id-input"
            className={`huge-input ${errorMessage ? 'input-error' : ''}`} 
            type="text"
            maxLength={4}
            value={gameIdInput}
            onChange={handleInputChange}
          />
          <button className="big-button" onClick={handleSubmit}>
            Submit
          </button>
          {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
      );
    }
  };

  return (
    <>
      <Header
        onCancel={handleBackSubmit}
        gameData={gameData}
        role={"PLAYER_CREATION"}
        confirmModalContent={""}
      />
      {renderComponent()}
    </>
  );
};

export default JoinGame;
