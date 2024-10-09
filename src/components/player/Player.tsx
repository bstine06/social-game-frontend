import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import PlayerQuestion from './PlayerQuestion';
import PlayerVote from './PlayerVote';
import { deletePlayerApi } from '../../api/playerApi';
import PlayerAnswer from './PlayerAnswer';


interface PlayerProps {
    gameId: string;
    playerId: string;
    gameState: string;
    playerName: string;
    onCancelPlayer: () => void;
}

const Player: React.FC<PlayerProps> = ({gameId, playerId, gameState, playerName, onCancelPlayer}) => {

    const renderComponent = () => {
        switch(gameState) { 
            case 'LOBBY': { 
               return (<p> waiting for the game to start... </p>);
            }
            case 'QUESTION': {
                return (<PlayerQuestion gameId={gameId} />)
            } 
            case 'ANSWER': {
                return (<PlayerAnswer gameId={gameId} />)
            }
            case 'VOTE': {
                return (<PlayerVote gameId={gameId} playerId={playerId} />)
            }
            default: { 
               
            } 
         } 
    }

    const deletePlayer = async () => {
        try {
          await deletePlayerApi();
          onCancelPlayer(); //Notify parent that the player is cancelled
        } catch (error) {
          console.error("Error deleting player", error);
        }
      };

    return (
        <>
        <Header gameId={gameId} playerName={playerName} role={"PLAYER"} onCancel={deletePlayer} confirmModalContent={`This will remove you from the game (${gameId})`} />
        {renderComponent()}
        </>
    )
}

export default Player;