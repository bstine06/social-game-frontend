import React, { useState, useEffect } from "react";
import { getCurrentBallotApi } from '../../api/voteApi';

interface HostDisplayBallotProps {
  gameId: string;
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

const HostDisplayBallot: React.FC<HostDisplayBallotProps> = ({ gameId }) => {
  const [answers, setAnswers] = useState<AnswerDisplay[]>([]); // Initialize the state as an empty array
  const [question, setQuestion] = useState<QuestionDisplay | null>(null);

  useEffect(() => {
    const getCurrentBallot = async (gameId: string) => {
      const currentBallot = await getCurrentBallotApi(gameId);
      console.log(currentBallot);
      setQuestion(currentBallot.question);
      setAnswers(currentBallot.answers);
    };

    getCurrentBallot(gameId);
  }, []);
  

  return (
    <>
      <div className="container">
        {question && <h2>{question.content}</h2>} {/* Access content of question */}
        {answers.map((answer) => (
          <p key={answer.answerId}>{answer.content}</p> // Access content of each answer
          ))}
      </div>
    </>
  );
  
};

export default HostDisplayBallot;
