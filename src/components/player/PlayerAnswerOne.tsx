import React, { useState } from "react";
import { submitAnswerApi } from "../../api/answerApi";
import PlayerConversationInput from "./PlayerConversationInput";
import { GameData } from "../types/GameDataTypes";

interface PlayerAnswerOneProps {
  gameId: string;
  question: Question;
  gameData: GameData;
  onAnswerSubmit: () => void;
}

interface Question {
  content: string;
  questionId: string;
}

const PlayerAnswerOne: React.FC<PlayerAnswerOneProps> = ({
  gameId,
  question,
  gameData,
  onAnswerSubmit,
}) => {

  const handleSubmit = async (answerInput: string) => {
    try {
      await submitAnswerApi(gameId, question.questionId, answerInput);
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
          gameData={gameData}
          onSubmit={handleSubmit}
        />
    </>
  );
};

export default PlayerAnswerOne;
