import React, { useState, useEffect } from "react";
import { getQuestionsForPlayerApi } from "../../api/questionApi";
import PlayerAnswerOne from "./PlayerAnswerOne";

interface PlayerAnswerProps {
  gameId: string;
  onAllAnswersSubmitted: () => void;
}

interface Question {
  content: string;
  questionId: string;
}

const PlayerAnswer: React.FC<PlayerAnswerProps> = ({
  gameId,
  onAllAnswersSubmitted,
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = useState<number>(0);

  useEffect(() => {
    const getQuestionsForPlayer = async () => {
      const response = await getQuestionsForPlayerApi();
      const filteredQuestions = response.map(
        ({ content, questionId }: Question) => ({ content, questionId })
      );
      setQuestions(filteredQuestions);
    };
    getQuestionsForPlayer();
  }, []);

  const nextQuestion = () => {
    if (questionIndex + 1 >= questions.length) {
      onAllAnswersSubmitted();
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  }

  return (
    <>
      {questions.length > 0 && (
        <PlayerAnswerOne
          gameId={gameId}
          question={questions[questionIndex]}
          onAnswerSubmit={nextQuestion}
        />
      )}
    </>
  );
};

export default PlayerAnswer;
