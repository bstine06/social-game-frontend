import React, { useEffect } from 'react';
import { getGameStateByGameId } from '../../api/appStateApi';

interface GameStatePollingProps {
  onUpdateState : () => void;
}

const GameStatePolling: React.FC<GameStatePollingProps> ({ onUpdateState }) => {
  
  useEffect(() => {
    console.log('Fetching global game state');
    const fetchGameState = async (gameId) => {
      try {
        const state = await getGameStateByGameId(gameId);  // Await the API response
        console.log('Game state:', state);
        onUpdateState(state);  // Pass the result to the parent component or state
      } catch (error) {
        console.error('Error fetching game state:', error);
      }
    };
  
    fetchGameState();  // Fetch initially
  
    const intervalId = setInterval(() => {
      console.log('Polling for game state');
      fetchGameState();
    }, 5000);  // Fetch every 5 seconds
  
    return () => {
      console.log('Cleaning up interval');
      clearInterval(intervalId);  // Cleanup on unmount
    };
  }, []);  // Only re-run effect if onUpdateState changes
  

  return null;  // Since there's nothing to render
}

export default GameStatePolling;
