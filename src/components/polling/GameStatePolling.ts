import React, { useEffect } from 'react';
import { getGameStateByGameId } from '../../api/gameApi';

interface GameStatePollingProps {
  onUpdateState : () => void;
  gameId: string;
}

const GameStatePolling: React.FC<GameStatePollingProps>  = ({ onUpdateState, gameId }) => {
  
  useEffect(() => {
    console.log(gameId);
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
  
    fetchGameState(gameId);  // Fetch initially
  
    const intervalId = setInterval(() => {
      console.log('Polling for game state');
      fetchGameState(gameId);
    }, 5000);  // Fetch every 5 seconds
  
    return () => {
      console.log('Cleaning up interval');
      clearInterval(intervalId);  // Cleanup on unmount
    };
  }, []);
  

  return null;  // Since there's nothing to render
}

export default GameStatePolling;
