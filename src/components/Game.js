import React, { useEffect } from "react";
import { initialize } from "../api/gameApi";
import QuestionsGathering from "./game/QuestionsGathering";

function Game({ gameState, userSession }) {
  useEffect(() => {
    async function initializeGame() {
      try {
        const response = await initialize();
        console.log(response);
      } catch (error) {
        console.error("Error starting game:", error);
      }
    }

    initializeGame();
  }, []);

  const handleQuestionSubmit = (response) => {
    if (response.success) {
      console.log(gameState);
    }
  }

  return (
    <div>
      <h1>Game is now active!</h1>
      <QuestionsGathering onQuestionSubmit={handleQuestionSubmit}/>
    </div>
  );
}

export default Game;

