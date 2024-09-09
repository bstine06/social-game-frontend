import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Dashboard from './components/Dashboard';
import Game from './components/Game';
import AppStatePolling from './components/polling/AppStatePolling';
import UserSessionPolling from './components/polling/UserSessionPolling';
import { updateGlobalAppState } from './api/appStateApi';
import './styles.css';

function App() {
  const [appState, setAppState] = useState("loading");
  const [userSession, setUserSession] = useState(null);

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

  const updateUserSession = (newUserSession) => {
    setUserSession(newUserSession);
  }


  const renderComponent = (userSession) => {
    switch (appState) {
      case "pregame": 
        return <Dashboard onStartGame={startGame} userSession={userSession} />;
      case "game":
        return <Game />;
      default:
        return <div>Invalid state</div>;
    }
  };

  return (
    <div id="app-container">
      <p>App state: {appState}</p>
      <p>
        Session ID: {userSession?.sessionId || "N/A"} |
        {userSession?.player
          ? ` Player Name: ${userSession.player.playerName} | Host: ${userSession.player.hostPlayer}`
          : " No player created"}
      </p>

      <AppStatePolling onUpdateAppState={updateAppState} />
      <UserSessionPolling onUpdateUserSession={updateUserSession} />
      {renderComponent(userSession)}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
