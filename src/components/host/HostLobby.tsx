import React, { useState } from "react";
const frontendUrl = process.env.REACT_APP_FRONTEND_URL;
import { PlayerData } from "../types/playerDataTypes";
import DisplayPlayers from "../common/DisplayPlayers";

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
        <h3>{`Players, go to ${frontendUrl} and press join.`}</h3>
        <h3>Then, enter {gameId} to join this game</h3>
        <button disabled={players.length < 3} onClick={onStartGame}>
          Start
        </button>
        <DisplayPlayers gameState={"LOBBY"} players={players} />
      </div>
    </>
  );
};

export default HostLobby;
