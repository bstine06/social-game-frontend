import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createGameApi, getGameByHostIdApi, getGameByIdApi, updateGameStateApi } from './api/gameApi';
import { getSessionRole } from './api/sessionApi';
import { getPlayerById } from './api/playerApi';
import ChooseRole from './components/home/ChooseRole';
import JoinGame from './components/join/JoinGame';
import Host from './components/host/Host';
import Player from './components/player/Player';
import ErrorModal from './components/common/ErrorModal';
import GameState from './components/websocket/GameState';
import './styles/styles.css';
import DevDisplay from './components/DevDisplay';
import Header from './components/common/Header';
import LilGuySelect from './components/join/LilGuySelect';

// Define the role types
type Role = 'HOST' | 'PLAYER' | 'PLAYER_CREATION' | 'UNASSIGNED';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [gameState, setGameState] = useState<string>("");
  const [gameId, setGameId] = useState<string>("");
  const [role, setRole] = useState<Role>('UNASSIGNED');
  const [connected, setConnected] = useState<boolean>(false);
  const [playerId, setPlayerId] = useState<string>("");
  const [playerName, setPlayerName] = useState<string>("");
  const [hostId, setHostId] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [devDisplayOpen, setDevDisplayOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#3f1468");

  const [devRoleDeclaration, setDevRoleDeclaration] = useState<Role>();

  // on page load, retrieve any existing role from backend via session cookie
  useEffect(() => {
    if (devRoleDeclaration) {
      setRole(devRoleDeclaration);
      return;
    }
    const getRole = async (): Promise<void> => {
      try {
        const newRole = await getSessionRole();
        setRole(newRole);
        setConnected(true);
      } catch (err: any) {
        setConnected(false);
        if (err instanceof Error) {
          if (err.message === "Failed to fetch") {
            setErrorMessage("There was an error connecting to the game server.");
          }
        }
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
          const game = await getGameByHostIdApi();
          setHostId(game.hostId);
          setGameId(game.gameId);
          setGameState(game.gameState);
        } else if (role === 'PLAYER') {
          const player = await getPlayerById();
          setPlayerId(player.playerId);
          setPlayerName(player.name);
          const game = await getGameByIdApi(player.gameId);
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
      const game = await createGameApi(); // Call API to create a new game
      setGameId(game.gameId); // Set gameId returned from backend
      setGameState(game.gameState); // Set gameState returned from backend
      setRole('HOST'); // Update role to 'HOST' after game creation
    } catch (error) {
      console.error('Error creating and hosting game:', error);
    }
  };

  const resetUserSession = () => {
    setGameId("")
    setGameState("");
    setRole('UNASSIGNED');
    setPlayerId("");
    setHostId("");
    setColor("#3f1468");
  }

  const setRoleToPlayer = () => {
    setRole('PLAYER');
  }

  const joinGame = (): void => {
    setRole('PLAYER_CREATION');
  }

  const startGame = (): void => {
    updateGameStateApi(gameId);
  }

  const updateLocalState = (state: string): void => {
    if (state.includes("DELETED_BY")) {
      switch (state) {
        case "DELETED_BY_INSUFFICIENT_PLAYERS":
          setErrorMessage(`Game ${gameId} was deleted because there were insufficient players remaining.`);
          resetUserSession();
          break;
        case "DELETED_BY_HOST":
          setErrorMessage(`Game ${gameId} was deleted by the host.`);
          resetUserSession();
          break;
        case "DELETED_BY_CLEAN_UP":
          setErrorMessage(`Game ${gameId} reached its time limit and was deleted automatically.`);
          resetUserSession();
          break;
      }
    } else {
      setGameState(state);
    }
  }

  const closeErrorModal = () => {
    setErrorMessage("");
  }

  const toggleDevDisplay = () => {
    setDevDisplayOpen(!devDisplayOpen);
  }

  const updateColor = (color: string) => {
    setColor(color);
  }

  const renderComponent = (role: Role, loading: boolean): JSX.Element | null => {
    if (loading) return <p>Loading...</p>;

    if (role === "UNASSIGNED") {
      return (
        <ChooseRole onChooseHost={createAndHostGame} onChooseJoin={joinGame} />
      );
    } else if (role === "HOST" && gameId) {
      return <Host gameId={gameId} gameState={gameState} onCancelHost={resetUserSession} onStartGame={startGame}/>;
    } else if (role === "PLAYER_CREATION") {
      return <JoinGame onCreatePlayer={setRoleToPlayer} onCancelJoin={resetUserSession} onColorSelect={updateColor}/>
    } else if (role === "PLAYER" && gameId) {
      return <Player gameId={gameId} playerId={playerId} gameState={gameState} playerName={playerName} onCancelPlayer={resetUserSession}/>;
    }

    return null;
  };

  return (
    <>
      <button onClick={toggleDevDisplay}>Toggle Developer Panel</button>
      {devDisplayOpen && <DevDisplay gameId={gameId} gameState={gameState} role={role} hostId={hostId} playerId={playerId} loading={loading} color={color}/>}
      {errorMessage && <ErrorModal message={errorMessage} onClose={closeErrorModal} />}
      {renderComponent(role, loading)}
      {gameId && <GameState onGameStateUpdate={updateLocalState} gameId={gameId} />}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
