import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createGame, getGameByHostId } from './api/gameApi';
import { createPlayer, getSessionRole } from './api/sessionApi';
import ChooseRole from './components/ChooseRole';
import SessionPolling from './components/polling/SessionPolling';
import './styles.css';

// Define the role types
type Role = 'HOST' | 'PLAYER' | 'UNASSIGNED';

function App() {
  // Define state types explicitly
  const [loading, setLoading] = useState<boolean>(true);
  const [gameState, setGameState] = useState<string | null>(null);
  const [gameId, setGameId] = useState<string | null>(null);
  const [role, setRole] = useState<Role>('UNASSIGNED');
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [hostId, setHostId] = useState<string | null>(null);

  useEffect(() => {
    const getRole = async (): Promise<void> => {
      try {
        const newRole = await getSessionRole();
        setRole(newRole);
      } catch (err: any) {
        console.error(err.message);
      }
    };

    // Set the role based on cookies
    getRole(); // Call the async function
  }, []); // This useEffect runs once on component mount to set the role

  useEffect(() => {
    // If role is still UNASSIGNED, skip fetching data
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
          const game = await getGameById(player.gameId);
          setGameId(game.gameId);
          setGameState(game.gameState);
        } else {
          throw new Error("Cannot verify session of unknown role type");
        }
      } catch (err: any) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Fetch data based on the role
    getDataById();
  }, [role]); // This useEffect depends on the 'role' state

  // Define functions for role actions
  const createAndHostGame = (): void => {
    setRole('HOST');
    createGame();
  };

  const createPlayer = (): void => {
    setRole("PLAYER");
  };

  // Ensure proper typing for the role parameter
  const renderComponent = (role: Role, loading: boolean): JSX.Element | null => {
    if (loading) return <p>Loading...</p>; // Display loading message
    if (role === "UNASSIGNED") {
      return (
        <ChooseRole onChooseHost={createAndHostGame} onChooseJoin={createPlayer} />
      );
    } else if (role === "HOST") {
      return <pre>HOST</pre>;
    } else if (role === "PLAYER") {
      return <pre>PLAYER</pre>;
    }

    return null; // Fallback
  };

  return (
    <>
      <div id="developer-info">
        <pre>DEVELOPER INFO</pre>
        <pre>gameId : {gameId || "null"}</pre>
        <pre>gameState : {gameState || "null"}</pre>
        <pre>role: {role}</pre>
        <pre>hostId : {hostId || "null"}</pre>
        <pre>playerId : {playerId || "null"}</pre>
        <pre>loading: {loading ? 'true' : 'false'}</pre>
      </div>
      {renderComponent(role, loading)}
    </>
  );
}

// Use ReactDOM with TypeScript
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
