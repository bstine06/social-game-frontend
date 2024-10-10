import React from "react";
import { PlayerData } from "../types/playerDataTypes";
import he from 'he';

interface PlayerReadyRisplayProps {
  player: PlayerData;
  showStatus?: boolean;
}

const PlayerReadyElement: React.FC<PlayerReadyRisplayProps> = ({ player, showStatus = true })=> {
  return (
    <>
        <div className="player-ready-element">
          <p>{he.decode(player.player.name)}</p>
          {showStatus && <div
            className={`player-status ${
              player.ready ? "player-ready" : "player-wait"
            }`}
          ></div>}
        </div>
    </>
  );
};

export default PlayerReadyElement;
