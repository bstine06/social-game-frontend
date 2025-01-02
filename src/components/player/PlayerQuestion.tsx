import React, { useState } from "react";
import { submitQuestionApi } from '../../api/questionApi';
import PlayerConversationInput from "./PlayerConversationInput";
import { GameData } from "../types/GameDataTypes";

interface PlayerQuestionProps {
  gameId: string;
  gameData: GameData;
  onFinishSubmission: () => void;
}

const PlayerQuestion: React.FC<PlayerQuestionProps> = ({
  gameId,
  gameData,
  onFinishSubmission
}) => {

  const handleSubmit = async (questionInput: string) => {
    try {
      await submitQuestionApi(gameId, questionInput);
      onFinishSubmission();
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  return (
    <>
      <div className="container">
        <PlayerConversationInput 
          instructions={"Enter a question or a prompt for your friends to answer!"}
          gameData={gameData}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default PlayerQuestion;
