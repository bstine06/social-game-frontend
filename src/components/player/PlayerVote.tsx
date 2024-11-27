import React, { useState, useEffect } from "react";
import { getCurrentBallotApi, submitVoteApi } from "../../api/voteApi";
import ConfirmModal from "../common/ConfirmModal";
import he from 'he';
import { Player } from "../types/playerDataTypes";

interface PlayerVoteProps {
  gameId: string;
  playerId: string
}

interface AnswerDisplay {
  content: string;
  answerId: string;
  player: Player;
}
  
interface QuestionDisplay {
  content: string;
  questionId: string;
  player: Player;
}

const PlayerVote: React.FC<PlayerVoteProps> = ({ gameId, playerId }) => {
  const [answers, setAnswers] = useState<AnswerDisplay[]>([]); // Initialize the state as an empty array
  const [question, setQuestion] = useState<QuestionDisplay | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<{ id: string; content: string } | null>(null); // State to store selected answer
  const [canVote, setCanVote] = useState<boolean>(true);

  useEffect(() => {
    const getCurrentBallot = async (gameId: string) => {
      const currentBallot = await getCurrentBallotApi(gameId);
      currentBallot.answers.forEach((answer: AnswerDisplay) => {
        if (answer.player.playerId === playerId) {
          setCanVote(false);
          return;
        }
      });
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
        {!canVote && <p>you can't vote for this one!</p>}
        {question && <h2>{he.decode(question.content)}</h2>}{" "}
        {answers.map((answer) => (
        <button
          disabled = {!canVote}
          key={answer.answerId}
          className="big-button"
          onClick={() => handleSubmit(answer.answerId, he.decode(answer.content))} // Call handleSubmit on button click
        >
          {he.decode(answer.content)}
        </button>
      ))}
      </div>
      {isModalOpen && selectedAnswer && (
      <ConfirmModal 
        message="Are you sure want to vote for this answer?"
        content={`"${selectedAnswer.content}"`}
        confirmText="Yes"
        cancelText="No, I'm indecisive"
        onConfirm={handleConfirm} 
        onCancel={handleCancel} 
      />
    )}
    </>
  );
};

export default PlayerVote;
