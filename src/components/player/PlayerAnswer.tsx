import React, { useState, useEffect } from "react";
import { getQuestionsForPlayerApi } from "../../api/questionApi";
import PlayerAnswerOne from "./PlayerAnswerOne";

interface PlayerAnswerProps {
  gameId: string;
}

interface Question {
  content: string;
  questionId: string;
}

const PlayerAnswer: React.FC<PlayerAnswerProps> = ({
  gameId
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [allAnswersSubmitted, setAllAnswersSubmitted] = useState<boolean>(false);

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
      setAllAnswersSubmitted(true);
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  }

  return (
    <>
    <div className="container">
      {questions.length > 0 && (
        <PlayerAnswerOne
          gameId={gameId}
          question={questions[questionIndex]}
          onAnswerSubmit={nextQuestion}
        />
      )}
      </div>
    </>
  );
};

export default PlayerAnswer;
