import React, { useState, useEffect } from 'react';

function ViewAllPlayersComponent() {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // State to hold the players data
  const [players, setPlayers] = useState([]);

  // Function to fetch players
  const fetchPlayers = async () => {
    console.log('Fetching all players');
    try {
      const response = await fetch(`${backendUrl}/get-all-players`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Parse the response as JSON
      const result = await response.json();

      // Update the state with the fetched players
      setPlayers(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Use useEffect to fetch players when the component loads
  useEffect(() => {
    fetchPlayers();
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div>
      <h2>View All Players</h2>
      <button onClick={fetchPlayers}>Fetch</button>

      {/* Render players in a table */}
      <div>
        {players.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Player Name</th>
                <th>Session ID</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={index}>
                  <td>{player.playerName}</td>
                  <td>{player.sessionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No players found</p>
        )}
      </div>
    </div>
  );
}

export default ViewAllPlayersComponent;
