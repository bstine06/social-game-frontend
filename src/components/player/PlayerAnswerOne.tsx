import React, { useState } from "react";
import { submitAnswerApi } from "../../api/answerApi";
import ConfirmModal from "../common/ConfirmModal";
import validator from "validator";
import he from 'he';
import PlayerConversationInput from "./PlayerConversationInput";

interface PlayerAnswerOneProps {
  gameId: string;
  question: Question;
  onAnswerSubmit: () => void;
}

interface Question {
  content: string;
  questionId: string;
}

const PlayerAnswerOne: React.FC<PlayerAnswerOneProps> = ({
  gameId,
  question,
  onAnswerSubmit,
}) => {

  const handleSubmit = async (answerInput: string) => {
    try {
      const sanitizedInput = validator.escape(answerInput); // Escapes any potentially harmful characters
      await submitAnswerApi(gameId, question.questionId, sanitizedInput);
      onAnswerSubmit();
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  return (
    <>
      <div className="container">
        <PlayerConversationInput 
          instructions={"Enter an answer to your friend's question."}
          prompt={question.content}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default PlayerAnswerOne;
