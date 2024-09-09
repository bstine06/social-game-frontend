import React, { useState, useEffect } from 'react';
import CreatePlayer from './CreatePlayer';
import AllSessions from './AllSessions';
import Session from './Session';
import { fetchSessions } from '../api/sessionApi';

function Dashboard({ onStartGame }) {
  const [sessions, setSessions] = useState([]);
  const [sessionReady, setSessionReady] = useState(false); // Track session status
  const [refreshSession, setRefreshSession] = useState(false);

  const fetchAllSessions = async () => {
    try {
      const result = await fetchSessions();
      setSessions(result);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  useEffect(() => {
    if (sessionReady) {
      fetchAllSessions();  // Fetch all sessions after session is ready
    }
  }, [sessionReady]);  // Depend on sessionReady

  const handlePlayerCreated = () => {
    fetchAllSessions();  // Re-fetch the list of players
    setRefreshSession(prev => !prev); // Toggle to refresh current player info
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
            <CreatePlayer onPlayerCreated={handlePlayerCreated} /> {/* Pass callback */}
          </div>
          <div className="item">
            <AllSessions sessions={sessions} />
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
