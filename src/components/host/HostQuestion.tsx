import React from "react";
import { PlayerData } from "../types/playerDataTypes";
import PlayerReadyDisplay from "../common/PlayerReadyDisplay";

interface HostQuestionProps {
  players: PlayerData[];
}

const HostQuestion: React.FC<HostQuestionProps> = ({ players }) => {
  return (
    <>
      <div className="container">
        <h2>Enter a question on your device for your friends to answer</h2>
      </div>
      <PlayerReadyDisplay players={players} />
    </>
  );
};

export default HostQuestion;
