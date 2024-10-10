import React, { useState } from "react";
import validator from "validator";
import ConfirmModal from '../common/ConfirmModal';
import { submitQuestionApi } from '../../api/questionApi';
import PlayerConversationInput from "./PlayerConversationInput";

interface PlayerQuestionProps {
  gameId: string;
  onFinishSubmission: () => void;
}

const PlayerQuestion: React.FC<PlayerQuestionProps> = ({
  gameId,
  onFinishSubmission
}) => {

  const handleSubmit = async (questionInput: string) => {
    try {
      const sanitizedInput = validator.escape(questionInput); // Escapes any potentially harmful characters
      await submitQuestionApi(gameId, sanitizedInput);
      onFinishSubmission();
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  return (
    <>
      <div className="container">
        <PlayerConversationInput 
          instructions={"Enter a question for your friends to answer!"}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default PlayerQuestion;
