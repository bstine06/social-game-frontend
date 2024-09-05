import React, { useState, useEffect } from 'react';
import CreatePlayerComponent from './CreatePlayerComponent';
import ViewAllPlayersComponent from './ViewAllPlayersComponent';
import TestComponent from './TestComponent';
import { fetchPlayers } from '../api/playerApi';

function PlayerDashboard() {
  const [players, setPlayers] = useState([]);

  const fetchAllPlayers = async () => {
    try {
      const result = await fetchPlayers();
      setPlayers(result);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  useEffect(() => {
    fetchAllPlayers();
  }, []);

  const handlePlayerCreated = () => {
    fetchAllPlayers();
  };

  return (
    <div id="dashboard-container">
      <div className="item">
        <h1>Social Game Dashboard</h1>
      </div>
      <div className="item">
        <TestComponent />
      </div>
      <div className="item">
        <CreatePlayerComponent onPlayerCreated={handlePlayerCreated} />
      </div>
      <div className="item">
        <ViewAllPlayersComponent players={players} />
      </div>
    </div>
  );
}

export default PlayerDashboard;

