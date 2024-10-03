import React, { useState, useEffect } from "react";
import { getCurrentBallotApi, submitVoteApi } from "../../api/voteApi";
import ConfirmModal from "../common/ConfirmModal";

interface PlayerVoteProps {
  gameId: string;
  onVoteSubmit: () => void;
}

interface AnswerDisplay {
    content: string;
    answerId: string;
    playerName: string;
  }
  
  interface QuestionDisplay {
    content: string;
    questionId: string;
    playerName: string;
  }

const PlayerVote: React.FC<PlayerVoteProps> = ({ gameId, onVoteSubmit }) => {
  const [answers, setAnswers] = useState<AnswerDisplay[]>([]); // Initialize the state as an empty array
  const [question, setQuestion] = useState<QuestionDisplay | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<{ id: string; content: string } | null>(null); // State to store selected answer

  useEffect(() => {
    const getCurrentBallot = async (gameId: string) => {
      const currentBallot = await getCurrentBallotApi(gameId);
      console.log(currentBallot);
      setQuestion(currentBallot.question);
      setAnswers(currentBallot.answers);
    };

    getCurrentBallot(gameId);
  }, []);

  const handleSubmit = async (answerId: string, answerContent: string) => {
    setSelectedAnswer({id: answerId, content: answerContent})
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    if (selectedAnswer == null) {
        setIsModalOpen(false);
        return;
    }
    try {
      await submitVoteApi(selectedAnswer.id);
      setIsModalOpen(false); // Close modal
      onVoteSubmit(); //Notify parent of player creation
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  }

  const handleCancel = () => {
    // Close the modal without submitting
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="container">
        {question && <h2>{question.content}</h2>}{" "}
        {answers.map((answer) => (
        <button
          key={answer.answerId}
          onClick={() => handleSubmit(answer.answerId, answer.content)} // Call handleSubmit on button click
        >
          {answer.content}
        </button>
      ))}
      </div>
      {isModalOpen && selectedAnswer && (
      <ConfirmModal 
        message="Are you sure want to vote for this answer?"
        content={selectedAnswer.content}
        confirmText="Yes, I know what I'm doing"
        cancelText="No, I'm indecisive"
        onConfirm={handleConfirm} 
        onCancel={handleCancel} 
      />
    )}
    </>
  );
};

export default PlayerVote;
