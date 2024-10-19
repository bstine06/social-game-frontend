import React, { useState } from "react";
const frontendUrl = process.env.REACT_APP_FRONTEND_URL;
import { PlayerData } from "../types/playerDataTypes";
import PlayerReadyDisplay from "../common/PlayerReadyDisplay";
import QRCodeGenerator from "./QRCodeGenerator";

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
        <p className="instruction">{`Players, go to ${frontendUrl} and press join.`}</p>
        <p className="instruction">Then, enter {gameId} to join this game</p>
        <QRCodeGenerator gameId={gameId}/>
        <button className="big-button" disabled={players.length < 3} onClick={onStartGame}>
          Start
        </button>
        <PlayerReadyDisplay players={players} showStatus={false}/>
      </div>
    </>
  );
};

export default HostLobby;
