import React, { useState } from "react";
import { submitAnswerApi } from "../../api/answerApi";
import PlayerConversationInput from "./PlayerConversationInput";
import { GameData } from "../types/GameDataTypes";
import { useGame } from "../../contexts/GameContext";

interface PlayerAnswerOneProps {
  question: Question;
  onAnswerSubmit: () => void;
}

interface Question {
  content: string;
  questionId: string;
}

const PlayerAnswerOne: React.FC<PlayerAnswerOneProps> = ({
  question,
  onAnswerSubmit,
}) => {

  const { gameData } = useGame();

  const handleSubmit = async (answerInput: string) => {
    try {
      await submitAnswerApi(gameData.gameId, question.questionId, answerInput);
      onAnswerSubmit();
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  return (
    <>
        <PlayerConversationInput 
          instructions={"Enter an answer to your friend's question."}
          prompt={question.content}
          onSubmit={handleSubmit}
        />
    </>
  );
};

export default PlayerAnswerOne;
