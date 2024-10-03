import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createGame, getGameByHostId, getGameById, updateGameState } from './api/gameApi';
import { getSessionRole } from './api/sessionApi';
import { getPlayerById } from './api/playerApi';
import ChooseRole from './components/ChooseRole';
import JoinGame from './components/join/JoinGame';
import Host from './components/host/Host';
import Player from './components/player/Player';
import ErrorModal from './components/ErrorModal';
import GameStatePolling from './components/polling/GameStatePolling';
import './styles.css';

// Define the role types
type Role = 'HOST' | 'PLAYER' | 'PLAYER_CREATION' | 'UNASSIGNED';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [gameState, setGameState] = useState<string | null>(null);
  const [gameId, setGameId] = useState<string | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [playerName, setPlayerName] = useState<string>("");
  const [hostId, setHostId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // on page load, retrieve any existing role from backend via session cookie
  useEffect(() => {
    const getRole = async (): Promise<void> => {
      try {
        const newRole = await getSessionRole();
        setRole(newRole);
      } catch (err: any) {
        console.error(err.message);
      }
    };

    getRole();
  }, []);

  // on page load, retrieve any game data related to any existing role
  useEffect(() => {
    if (role === 'UNASSIGNED') {
      setLoading(false);
      return;
    }

    const getDataById = async (): Promise<void> => {
      try {
        if (role === 'HOST') {
          const game = await getGameByHostId();
          setHostId(game.hostId);
          setGameId(game.gameId);
          setGameState(game.gameState);
        } else if (role === 'PLAYER') {
          const player = await getPlayerById();
          setPlayerId(player.playerId);
          setPlayerName(player.name);
          const game = await getGameById(player.gameId);
          setGameId(game.gameId);
          setGameState(game.gameState);
        }
      } catch (err: any) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (role) {
      getDataById();
    }
  }, [role]);

  const createAndHostGame = async () => {
    try {
      const game = await createGame(); // Call API to create a new game
      setGameId(game.gameId); // Set gameId returned from backend
      setGameState(game.gameState); // Set gameState returned from backend
      setRole('HOST'); // Update role to 'HOST' after game creation
    } catch (error) {
      console.error('Error creating and hosting game:', error);
    }
  };

  const resetUserSession = () => {
    setLoading(true);
    setGameId(null)
    setGameState(null);
    setRole('UNASSIGNED');
    setPlayerId(null);
    setHostId(null);
  }

  const setRoleToPlayer = () => {
    setRole('PLAYER');
  }

  const joinGame = (): void => {
    setRole('PLAYER_CREATION');
  }

  const startGame = (): void => {
    updateGameState(gameId);
  }

  const updateLocalState = (state: string): void => {
    if (state === "error") {
      setErrorMessage(`Game ${gameId} was terminated. You've been returned to the home screen.`);
      resetUserSession();
    }
    setGameState(state);
  }

  const closeErrorModal = () => {
    setErrorMessage("");
  }

  const renderComponent = (role: Role | null, loading: boolean): JSX.Element | null => {
    if (loading) return <p>Loading...</p>;

    if (role === "UNASSIGNED") {
      return (
        <ChooseRole onChooseHost={createAndHostGame} onChooseJoin={joinGame} />
      );
    } else if (role === "HOST" && gameId) {
      return <Host gameId={gameId} gameState={gameState} onCancelHost={resetUserSession} onStartGame={startGame}/>;
    } else if (role === "PLAYER_CREATION") {
      return <JoinGame onCreatePlayer={setRoleToPlayer} onCancelJoin={resetUserSession}/>
    } else if (role === "PLAYER" && gameId) {
      return <Player gameId={gameId} gameState={gameState} playerName={playerName} onCancelPlayer={resetUserSession}/>;
    }

    return null;
  };

  return (
    <>
      {/* Only render GameStatePolling if gameId is available */}
      {gameId && <GameStatePolling onUpdateState={updateLocalState} gameId={gameId} />} 
      <div id="developer-info">
        <pre>DEVELOPER INFO</pre>
        <pre>gameId : {gameId || "null"}</pre>
        <pre>gameState : {gameState || "null"}</pre>
        <pre>role: {role}</pre>
        <pre>id : {hostId ? hostId: playerId ? playerId : "null"}</pre>
        <pre>loading: {loading ? 'true' : 'false'}</pre>
      </div>
      {errorMessage && <ErrorModal message={errorMessage} onClose={closeErrorModal} />}
      {renderComponent(role, loading)}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
