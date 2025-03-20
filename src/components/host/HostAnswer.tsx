import React from "react";
import { PlayerData } from "../types/playerDataTypes";
import PlayerReadyDisplay from "../common/PlayerReadyDisplay";
import { GameData } from "../types/GameDataTypes";
import Timer from "../common/Timer";
import { useGame } from "../../contexts/GameContext";

interface HostAnswerProps {
  players: PlayerData[];
}

const HostAnswer: React.FC<HostAnswerProps> = ({
  players
}) => {

  const { gameData } = useGame();

  return (
    <>
      <div className="container">
        <h2 className="">Answer two questions from other players!</h2>
        <Timer/>
      </div>
      <PlayerReadyDisplay players={players} showStatus={true}/>
    </>
  );
};

export default HostAnswer;
