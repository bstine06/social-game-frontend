import React from "react";
import { PlayerData } from "../types/playerDataTypes";
import PlayerReadyDisplay from "../common/PlayerReadyDisplay";
import { GameData } from "../types/GameDataTypes";
import Timer from "../common/Timer";

interface HostAnswerProps {
  players: PlayerData[];
  gameData: GameData;
}

const HostAnswer: React.FC<HostAnswerProps> = ({
  players,
  gameData
}) => {
  return (
    <>
      <div className="container">
        <h2 className="">Answer two questions from other players!</h2>
        <Timer gameData={gameData}/>
      </div>
      <PlayerReadyDisplay players={players} showStatus={true}/>
    </>
  );
};

export default HostAnswer;
