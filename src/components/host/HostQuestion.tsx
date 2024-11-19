import React from "react";
import { PlayerData } from "../types/playerDataTypes";
import PlayerReadyDisplay from "../common/PlayerReadyDisplay";
import Timer from "../common/Timer";
import { GameData } from "../types/GameDataTypes";

interface HostQuestionProps {
  gameData: GameData;
  players: PlayerData[];
}

const HostQuestion: React.FC<HostQuestionProps> = ({ players, gameData }) => {
  return (
    <>
      <div className="container">
        <h2>Enter a question on your device for your friends to answer</h2>
      </div>
      <PlayerReadyDisplay players={players} />
      <Timer gameData={gameData}/>
    </>
  );
};

export default HostQuestion;
