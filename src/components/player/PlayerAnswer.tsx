import React, { useState, useEffect } from "react";
import { getQuestionsForPlayerApi } from "../../api/questionApi";
import PlayerAnswerOne from "./PlayerAnswerOne";
import { GameData } from "../types/GameDataTypes";

interface PlayerAnswerProps {
  gameId: string;
  gameData: GameData;
  onFinishSubmission: () => void;
}

interface Question {
  content: string;
  questionId: string;
}

const PlayerAnswer: React.FC<PlayerAnswerProps> = ({
  gameId,
  gameData,
  onFinishSubmission,
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = useState<number>(0);

  useEffect(() => {
    const getQuestionsForPlayer = async () => {
      const response = await getQuestionsForPlayerApi();
      const filteredQuestions = response.map(
        ({ content, questionId }: Question) => ({ content, questionId })
      );
      if (filteredQuestions.length < 1){
        onFinishSubmission();
      } 
      setQuestions(filteredQuestions);
    };
    getQuestionsForPlayer();
  }, []);

  const nextQuestion = () => {
    if (questionIndex + 1 >= questions.length) {
      onFinishSubmission();
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  };

  return (
    <>
      <div className="container">
        {questions.length > 0 && (
          <PlayerAnswerOne
            gameId={gameId}
            gameData={gameData}
            question={questions[questionIndex]}
            onAnswerSubmit={nextQuestion}
          />
        )}
      </div>
    </>
  );
};

export default PlayerAnswer;
