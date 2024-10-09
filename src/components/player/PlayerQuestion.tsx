import React, { useState } from "react";
import validator from "validator";
import ConfirmModal from '../common/ConfirmModal';
import { submitQuestionApi } from '../../api/questionApi';

interface PlayerQuestionProps {
  gameId: string;
  onQuestionSubmit: () => void;
}

const PlayerQuestion: React.FC<PlayerQuestionProps> = ({
  gameId,
  onQuestionSubmit,
}) => {
  const [questionInput, setQuestionInput] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/[^a-zA-Z0-9\s.,_!?'"()-]/g, "");
    setQuestionInput(newValue);
  };

  const handleSubmit = async () => {
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    try {
      const sanitizedInput = validator.escape(questionInput); // Escapes any potentially harmful characters
      await submitQuestionApi(gameId, sanitizedInput);
      setQuestionInput(""); // Clear input field
      setIsModalOpen(false); // Close modal
      onQuestionSubmit();
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  const handleCancel = () => {
    // Close the modal without submitting
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="container">
        <h4>Enter a question for your friends to answer!</h4>
        <h2>Make it funny!</h2>
        <input type="text" value={questionInput} onChange={handleInputChange} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {/* Show the modal if there's input and the modal is open */}
      {isModalOpen && (
        <ConfirmModal
          message="Are you sure want to submit this question?"
          content={questionInput}
          confirmText="Yes, I'm sure"
          cancelText="No, let me edit that!"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default PlayerQuestion;
