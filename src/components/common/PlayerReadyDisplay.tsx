import React from "react";
import { PlayerData } from "../types/playerDataTypes";
import PlayerReadyElement from "./PlayerReadyElement";
import "../../styles/playerDisplay.css";

interface PlayerReadyDisplayProps {
  players: PlayerData[];
  showStatus? : boolean;
}

const PlayerReadyDisplay: React.FC<PlayerReadyDisplayProps> = ({ players, showStatus = true }) => {
  return (
    <>
      <div className="player-ready-display">
        {players.map((player) => (
          <PlayerReadyElement key={player.player.playerId} player={player} showStatus={showStatus} />
        ))}
      </div>
    </>
  );
};

export default PlayerReadyDisplay;
