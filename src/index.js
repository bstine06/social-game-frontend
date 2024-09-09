import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Dashboard from './components/Dashboard';
import Game from './components/Game';
import AppStatePolling from './components/AppStatePolling';
import { updateGlobalAppState } from './api/appStateApi';
import './styles.css';

function App() {
  const [appState, setAppState] = useState("loading");

  const startGame = () => {
    setAppState("game"); // Trigger the game to start
    updateGlobalAppState("game");
  };

  const updateAppState = (newAppState) => {
    // Only update the state if it's different to avoid unnecessary re-renders
    if (newAppState !== appState) {
      setAppState(newAppState);
    }
  }


  const renderComponent = () => {
    switch (appState) {
      case "pregame": 
        return <Dashboard onStartGame={startGame} />;
      case "game":
        return <Game />;
      default:
        return <div>Invalid state</div>;
    }
  };

  return (
    <div id="app-container">
      <p>App state: { appState }</p>
      <AppStatePolling onUpdateAppState={updateAppState}/>
      {renderComponent()}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
