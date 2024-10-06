import React, { useState } from "react";
import { submitAnswerApi } from "../../api/answerApi";
import ConfirmModal from "../common/ConfirmModal";
import validator from "validator";
import he from 'he';

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [answerInput, setAnswerInput] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/[^a-zA-Z0-9\s.,!?'"()-]/g, "");
    setAnswerInput(newValue);
  };

  const handleSubmit = async () => {
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    try {
      const sanitizedInput = validator.escape(answerInput); // Escapes any potentially harmful characters
      await submitAnswerApi(gameId, question.questionId, sanitizedInput);
      setAnswerInput(""); // Clear input field
      setIsModalOpen(false); // Close modal
      onAnswerSubmit();
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const handleCancel = () => {
    // Close the modal without submitting
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="container">
        <h4>Enter an answer to your friend's question:</h4>
        <h2>{he.decode(question.content)}</h2>
        <input type="text" value={answerInput} onChange={handleInputChange} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {/* Show the modal if there's input and the modal is open */}
      {isModalOpen && (
        <ConfirmModal
          message="Are you sure want to submit this answer?"
          content={answerInput}
          confirmText="Yes, I'm sure"
          cancelText="No, let me edit that!"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default PlayerAnswerOne;
