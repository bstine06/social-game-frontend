import React from "react";
import { PlayerData } from "../types/playerDataTypes";
import PlayerReadyDisplay from "../common/PlayerReadyDisplay";

interface HostAnswerProps {
  players: PlayerData[];
}

const HostAnswer: React.FC<HostAnswerProps> = ({
  players
}) => {
  return (
    <>
      <div className="container">
        <p>Enter answers to the questions from your friends</p>
          <PlayerReadyDisplay players={players}/>
      </div>
    </>
  );
};

export default HostAnswer;
