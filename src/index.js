import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Dashboard from './components/Dashboard';
import Game from './components/Game';
import './styles.css';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true); // Trigger the game to start
  };

  return (
    <div id="app-container">
      {gameStarted ? (
        <Game />  // Load the game component when game starts
      ) : (
        <Dashboard onStartGame={startGame} />  // Pass startGame function to Dashboard
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
