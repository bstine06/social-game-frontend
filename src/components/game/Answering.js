import React, { useState, useEffect } from 'react';
import { getQuestions, submitAnswer } from '../../api/gameApi';
import ConfirmModal from './ConfirmModal';
import AnswerOneQuestion from './AnswerOneQuestion';

function Answering() {
  const [questions, setQuestions] = useState(null);
  const [currentlyAnsweringIndex, setCurrentlyAnsweringIndex] = useState(0);

  useEffect(() => {
    async function getQuestionsToAnswer() {
      try {
        const response = await getQuestions();
        console.log(response);
        setQuestions(response);
      } catch (error) {
        console.error("Error fetching questions to answer:", error);
      }
    }

    getQuestionsToAnswer();
  }, []);

  // Add a check before accessing questions[0]
  if (!questions || questions.length === 0) {
    return <div>Loading...</div>; // Or any other loading state
  }

  const handleAnswerSubmit = () => {
    setCurrentlyAnsweringIndex(currentlyAnsweringIndex+1);
  }

  const render = () => {
    switch (currentlyAnsweringIndex) {
      case 0:
        return <AnswerOneQuestion question={questions[0].text} questionId={questions[0].conversationId} onAnswerSubmit={handleAnswerSubmit}/>;
        break;
      case 1:
        return <AnswerOneQuestion question={questions[1].text} questionId={questions[1].conversationId} onAnswerSubmit={handleAnswerSubmit}/>;
        break;
      default:
        return <p>You've answered all the questions!</p>;
    }
  }

  return (
    <div>
      {render()}
    </div>
  );
}

export default Answering;