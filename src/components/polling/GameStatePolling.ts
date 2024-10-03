import React, { useEffect } from 'react';
import { getGameStateByGameId } from '../../api/gameApi';

interface GameStatePollingProps {
  onUpdateState : () => void;
  gameId: string;
}

const GameStatePolling: React.FC<GameStatePollingProps>  = ({ onUpdateState, gameId }) => {
  
  useEffect(() => {
    const fetchGameState = async (gameId) => {
      try {
        const state = await getGameStateByGameId(gameId);  // Await the API response
        onUpdateState(state);  // Pass the result to the parent component or state
      } catch (error) {
        // console.error('Error fetching game state:', error);
        onUpdateState("error");
      }
    };
  
    fetchGameState(gameId);  // Fetch initially
  
    const intervalId = setInterval(() => {
      fetchGameState(gameId);
    }, 5000);  // Fetch every 5 seconds
  
    return () => {
      clearInterval(intervalId);  // Cleanup on unmount
    };
  }, []);
  

  return null;  // Since there's nothing to render
}

export default GameStatePolling;
