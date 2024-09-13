import React, { useEffect } from "react";
import QuestionsGathering from "./game/QuestionsGathering";
import Answering from "./game/Answering";

function Game({ gameState, userSession }) {

  const handleQuestionSubmit = (response) => {
    if (response.success) {
      console.log(gameState);
    }
  }

  const handleAnswerSubmit = (response) => {
    if (response.success) {
      console.log(gameState);
    }
  }

  const renderComponent = () => {
    switch (gameState) {
      case "asking": 
        return <QuestionsGathering onQuestionSubmit={handleQuestionSubmit}/>;
      case "answering":
        return <Answering />;
      default:
        return <div>Invalid state</div>;
    }
  };

  return (
    <div>
      {renderComponent()}
    </div>
  );
}

export default Game;

