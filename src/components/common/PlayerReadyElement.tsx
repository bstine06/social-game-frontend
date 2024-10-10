import React from "react";
import { PlayerData } from "../types/playerDataTypes";

interface PlayerReadyRisplayProps {
  player: PlayerData;
}

const PlayerReadyDisplay: React.FC<PlayerReadyRisplayProps> = ({ player }) => {
  return (
    <>
      <div className="player-ready-display">
        <div className="player-ready-element">
          <p>{player.player.name}</p>
          <div
            className={`player-status ${
              player.ready ? "player-ready" : "player-wait"
            }`}
          ></div>
        </div>
      </div>
    </>
  );
};

export default PlayerReadyDisplay;
