import React, { useState } from 'react';
import WatchPlayers from './WatchPlayers';
import ConfirmModal from '../ConfirmModal';
import { deleteGameApi } from '../../api/gameApi';

// Define the type for the props
interface HostLobbyProps {
  gameId: string;
  onCancelHost : () => void;
}

const HostLobby: React.FC<HostLobbyProps> = ({ gameId, onCancelHost }) => {
  const [playerCount, setPlayerCount] = useState<int>(0);

  const updatePlayerCount = (count : int) => {
    setPlayerCount(count);
  }

  const handleStartGame = () => {

  }

  return (
    <>
    <div className="container">
      <p>This device is going to host your game. It will be used as a display for everyone. Don't close this window!</p>
      <h3>Players, go to ___URL____ and press join.</h3>
      <h3>Then, enter {gameId} to join this game</h3>
      <button disabled={playerCount < 3} onClick={handleStartGame}>Start</button>
      <WatchPlayers gameId={gameId} onPlayerCountChanged={updatePlayerCount}/>
    </div>
    </>
  );
}

export default HostLobby;