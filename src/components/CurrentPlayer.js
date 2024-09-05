import React, { useState, useEffect } from 'react';
import { getPlayer } from '../api/playerApi';

function CurrentPlayer({ refreshPlayer }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const playerData = await getPlayer();
        console.log('Player Data:', playerData);
        setMessage("Player found: " + playerData);
      } catch (error) {
        console.error('Error fetching player data:', error);
        setMessage("No player found.");
      }
    };

    fetchPlayer();
  }, [refreshPlayer]);  // Re-fetch player when refreshPlayer changes

  return (
    <div>
      <h2>Unique player information:</h2>
      <p>{message}</p>
    </div>
  );
}

export default CurrentPlayer;
