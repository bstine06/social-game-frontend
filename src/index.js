import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Dashboard from './components/Dashboard';
import Game from './components/Game';
import AppStatePolling from './components/polling/AppStatePolling';
import UserSessionPolling from './components/polling/UserSessionPolling';
import { updateGlobalState } from './api/appStateApi';
import { fetchSessions } from './api/sessionApi';
import deepEqual from './deepEqual';
import './styles.css';

function App() {
  const [state, setState] = useState({
    appState: "loading",
    gameState: "inactive"
  });
  const [userSession, setUserSession] = useState({
    sessionId: null,
    name: null
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const startGame = async () => {
    const sessions = await fetchSessions();
    const countRegistered = sessions.reduce((acc, entry) => {
      return entry.name !== null ? acc + 1 : acc;
    }, 0);
    if (countRegistered >= 3) {
      updateGlobalState({
        appState: "game",
        gameState: "inactive"
      });
    } else {
      setErrorMessage("Must have at least 3 players registered to start");
    }
  };

  const updateState = (newState) => {
    if (!deepEqual(newState, state)) {
      setState(newState);
    }
  };

  const updateUserSession = (newUserSession) => {
    if (!deepEqual(newUserSession, userSession)) {
      setUserSession(newUserSession);
    }
  }

  const getAppState = () => {
    return state.appState;
  }

  const getGameState = () => {
    return state.gameState;
  }


  const renderComponent = (userSession) => {
    switch (state.appState) {
      case "pregame": 
        return <Dashboard onStartGame={startGame} userSession={userSession} errorMessage={errorMessage}/>;
      case "game":
        return <Game gameState={getGameState()} userSession={userSession}/>;
      default:
        return <div>Invalid state</div>;
    }
  };

  return (
    <div id="app-container">
      <p>App state: {getAppState()}</p>
      <p>
        Session ID: {userSession?.sessionId || "N/A"} |
        {userSession?.name
          ? ` Name: ${userSession.name}`
          : " No name created"}
      </p>

      <AppStatePolling onUpdateState={updateState} />
      <UserSessionPolling onUpdateUserSession={updateUserSession} />
      {renderComponent(userSession)}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
