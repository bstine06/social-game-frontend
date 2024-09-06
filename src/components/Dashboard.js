import React, { useState, useEffect } from 'react';
import CreatePlayer from './CreatePlayer';
import AllPlayers from './AllPlayers';
import Session from './Session';
import CurrentPlayer from './CurrentPlayer';
import { fetchPlayers } from '../api/playerApi';

function Dashboard({ onStartGame }) {
  const [players, setPlayers] = useState([]);
  const [sessionReady, setSessionReady] = useState(false); // Track session status
  const [refreshPlayer, setRefreshPlayer] = useState(false); // Trigger player refresh

  const fetchAllPlayers = async () => {
    try {
      const result = await fetchPlayers();
      setPlayers(result);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  useEffect(() => {
    if (sessionReady) {
      fetchAllPlayers();  // Fetch players after session is ready
    }
  }, [sessionReady]);  // Depend on sessionReady

  const handlePlayerCreated = () => {
    fetchAllPlayers();  // Re-fetch the list of players
    setRefreshPlayer(prev => !prev); // Toggle to refresh current player info
  };

  const startGame = () => {
    onStartGame();
  }

  return (
    <div id="dashboard-container">
      <div className="item">
        <h1>Social Game Dashboard</h1>
        <button onClick={startGame}>Start game</button>
      </div>
      <div className="item">
        <Session onSessionReady={() => setSessionReady(true)} />  {/* Pass callback to session */}
      </div>
      {sessionReady && (
        <>
          <div className="item">
            <CurrentPlayer refreshPlayer={refreshPlayer} />  {/* Pass refresh state */}
          </div>
          <div className="item">
            <CreatePlayer onPlayerCreated={handlePlayerCreated} /> {/* Pass callback */}
          </div>
          <div className="item">
            <AllPlayers players={players} />
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
