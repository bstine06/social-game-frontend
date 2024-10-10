import React from "react";
import { PlayerData } from "../types/playerDataTypes";
import PlayerReadyElement from "./PlayerReadyElement";
import "../../styles/playerDisplay.css";

interface PlayerReadyDisplayProps {
  players: PlayerData[];
}

const PlayerReadyDisplay: React.FC<PlayerReadyDisplayProps> = ({ players }) => {
  return (
    <>
      <div className="player-ready-display">
        {players.map((player) => (
          <PlayerReadyElement player={player} />
        ))}
      </div>
    </>
  );
};

export default PlayerReadyDisplay;
