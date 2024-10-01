import React, { useState, useEffect } from 'react';
import { getAllPlayerNamesInGame } from '../api/playerApi'

// Define the type for the props
interface WatchPlayersProps {
  gameId: string;
}

const WatchPlayers: React.FC<WatchPlayersProps> = ({ gameId }) => {
    const [playerNames, setPlayerNames] = useState<string[]>([]); // Assuming the players data is an array of strings
  
    // Polling for player data every 5 seconds
    useEffect(() => {
      // Define the function to fetch the players
      const fetchPlayerNames = async (gameId : string) => {
        try {
          const fetchedPlayerNames = await getAllPlayerNamesInGame(gameId);
          setPlayerNames(fetchedPlayerNames);
        } catch (error) {
          console.error('Error fetching players:', error);
        }
      };
  
      // Call it initially
      fetchPlayerNames(gameId);
  
      // Set up polling every 5 seconds
      const intervalId = setInterval(() => fetchPlayerNames(gameId), 5000); // Use an arrow function to ensure gameId is passed
  
      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }, [gameId]); // Re-run the effect if the gameId changes
  
    return (
      <div>
        <h3>Players in the game:</h3>
        <ul>
          {playerNames.map((playerName, index) => (
            <li key={index}>{playerName}</li>
          ))}
        </ul>
      </div>
    );
  };
  

export default WatchPlayers;