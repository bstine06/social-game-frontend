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
        <h2 className="">Answer two questions from other players!</h2>
          
      </div>
      <PlayerReadyDisplay players={players} showStatus={true}/>
    </>
  );
};

export default HostAnswer;
