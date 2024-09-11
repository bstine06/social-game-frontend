import React, { useEffect } from "react";
import { startGame } from "../api/gameApi";

function Game() {

  // useEffect(async () => {
  //   async function startGameApi() {
  //     const response = await startGame();
  //     console.log(response);
  //   }

  //   startGameApi();
  // }, []);

  return (
    <div>
      <h1>Game is now active!</h1>
      {/* Add your game-related components here */}
    </div>
  );
}

export default Game;
