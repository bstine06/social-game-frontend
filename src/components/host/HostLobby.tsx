import React, { useState } from 'react';
import WatchPlayers from './WatchPlayers';
import ConfirmModal from '../common/ConfirmModal';
import { deleteGameApi } from '../../api/gameApi';

// Define the type for the props
interface HostLobbyProps {
  gameId: string;
  onCancelHost : () => void;
  onStartGame : () => void;
}

const HostLobby: React.FC<HostLobbyProps> = ({ gameId, onCancelHost, onStartGame }) => {
  const [playerCount, setPlayerCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const updatePlayerCount = (count : number) => {
    setPlayerCount(count);
  }

  const handleStartGame = () => {
    if (playerCount < 3) return;
    setLoading(true);
    onStartGame();
  }

  const renderComponent = () => {
    if (loading) { 
      return (
        <p>Starting game...</p>
      );
    } else {
      return (
        <>
        <p>This device is going to host your game. 
        It will be used as a display for everyone.</p>
      <h3>Players, go to ___URL____ and press join.</h3>
      <h3>Then, enter {gameId} to join this game</h3>
      <button disabled={playerCount < 3} onClick={handleStartGame}>Start</button>
      <WatchPlayers gameId={gameId} onPlayerCountChanged={updatePlayerCount}/>
      </>
      )
    }
    
  }

  return (
    <>
    <div className="container">
      {renderComponent()}
    </div>
    </>
  );
}

export default HostLobby;