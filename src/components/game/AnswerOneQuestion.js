import React, { useState } from 'react';
import { submitAnswer } from '../../api/gameApi';
import ConfirmModal from './ConfirmModal';

function AnswerOneQuestion({ question, questionId, onAnswerSubmit }) {
  const [answerInput, setAnswerInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (event) => {
    setAnswerInput(event.target.value);
  };

  const handleSubmit = () => {
    // Open the modal for confirmation
    console.log("setting modal open");
    console.log(answerInput);
    setIsModalOpen(true);
    console.log(questionId);
  };

  const handleConfirm = async () => {
    // Proceed with submission after confirmation
    try {
      const response = await submitAnswer(questionId, answerInput);
      onAnswerSubmit(response); // Notify parent of update
      setAnswerInput(''); // Clear input field
      setIsModalOpen(false); // Close modal
    } catch (error) {
      console.error('Error while submitting answer:', error);
    }
  };

  const handleCancel = () => {
    // Close the modal without submitting
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>Enter a funny answer to the question:</h2>
      <h4>{question}</h4>

      <input
        type="text"
        value={answerInput}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Submit</button>

      {/* Show the modal if there's input and the modal is open */}
      {isModalOpen && (
        <ConfirmModal 
          content={answerInput} 
          onConfirm={handleConfirm} 
          onCancel={handleCancel} 
        />
      )}
    </div>
  );
}

export default AnswerOneQuestion;