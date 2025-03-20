import React from "react";
import { PlayerData } from "../types/playerDataTypes";
import PlayerReadyDisplay from "../common/PlayerReadyDisplay";
import Timer from "../common/Timer";
import { GameData } from "../types/GameDataTypes";
import { useGame } from "../../contexts/GameContext";

interface HostQuestionProps {
  players: PlayerData[];
}

const HostQuestion: React.FC<HostQuestionProps> = ({ players }) => {

  const { gameData } = useGame();

  return (
    <>
      <div className="container">
        <h2>Enter a question or prompt on your device for your friends to answer</h2>
        <Timer/>
      </div>
      <PlayerReadyDisplay players={players} />
      
    </>
  );
};

export default HostQuestion;
