import React, { useState } from 'react';
import { submitQuestion } from '../../api/gameApi';
import ConfirmModal from './ConfirmModal';

function QuestionsGathering({ onQuestionSubmit }) {
  const [questionInput, setQuestionInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (event) => {
    setQuestionInput(event.target.value);
  };

  const handleSubmit = () => {
    // Open the modal for confirmation
    console.log("setting modal open");
    console.log(questionInput);
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    // Proceed with submission after confirmation
    try {
      const response = await submitQuestion(questionInput);
      onQuestionSubmit(response); // Notify parent of update
      setQuestionInput(''); // Clear input field
      setIsModalOpen(false); // Close modal
    } catch (error) {
      console.error('Error while submitting question:', error);
    }
  };

  const handleCancel = () => {
    // Close the modal without submitting
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>Enter a question for others to answer:</h2>
      <h4>Make it funny!</h4>

      <input
        type="text"
        value={questionInput}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Submit</button>

      {/* Show the modal if there's input and the modal is open */}
      {isModalOpen && (
        <ConfirmModal 
          content={questionInput} 
          onConfirm={handleConfirm} 
          onCancel={handleCancel} 
        />
      )}
    </div>
  );
}

export default QuestionsGathering;