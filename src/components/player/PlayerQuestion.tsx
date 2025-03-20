import React, { useState } from "react";
import { submitQuestionApi } from '../../api/questionApi';
import PlayerConversationInput from "./PlayerConversationInput";
import { GameData } from "../types/GameDataTypes";
import { useGame } from "../../contexts/GameContext";

interface PlayerQuestionProps {
  onFinishSubmission: () => void;
}

const PlayerQuestion: React.FC<PlayerQuestionProps> = ({
  onFinishSubmission
}) => {

  const { gameData } = useGame();

  const handleSubmit = async (questionInput: string) => {
    try {
      await submitQuestionApi(gameData.gameId, questionInput);
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
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default PlayerQuestion;
