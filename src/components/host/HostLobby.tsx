import React, { useState } from "react";
const frontendUrl = process.env.REACT_APP_FRONTEND_URL;
import { PlayerData } from "../types/playerDataTypes";
import PlayerReadyDisplay from "../common/PlayerReadyDisplay";

// Define the type for the props
interface HostLobbyProps {
  gameId: string;
  players: PlayerData[];
  onStartGame: () => void;
}

const HostLobby: React.FC<HostLobbyProps> = ({
  gameId,
  players,
  onStartGame,
}) => {
  return (
    <>
      <div className="container">
        <p>
          This device is going to host your game. It will be used as a display
          for everyone.
        </p>
        <p>{`Players, go to ${frontendUrl} and press join.`}</p>
        <p>Then, enter {gameId} to join this game</p>
        <button className="big-button" disabled={players.length < 3} onClick={onStartGame}>
          Start
        </button>
        <PlayerReadyDisplay players={players} />
      </div>
    </>
  );
};

export default HostLobby;
