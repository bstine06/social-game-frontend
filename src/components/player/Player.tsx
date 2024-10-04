import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import PlayerQuestion from './PlayerQuestion';
import PlayerVote from './PlayerVote';
import { deletePlayerApi } from '../../api/playerApi';
import PlayerAnswer from './PlayerAnswer';


interface PlayerProps {
    gameId: string;
    gameState: string;
    playerName: string;
    onCancelPlayer: () => void;
}

const Player: React.FC<PlayerProps> = ({gameId, gameState, playerName, onCancelPlayer}) => {
    const [waiting, setWaiting] = useState<boolean>(true);

    useEffect(() => {
        setWaiting(false);
    }, [gameState])

    const startWaiting = () => {
        setWaiting(true);
    }

    const renderComponent = () => {
        switch(gameState) { 
            case 'LOBBY': { 
               return (<p> waiting for the game to start... </p>);
            }
            case 'QUESTION': {
                return (<PlayerQuestion gameId={gameId} onQuestionSubmit={startWaiting}/>)
            } 
            case 'ANSWER': {
                return (<PlayerAnswer gameId={gameId} onAllAnswersSubmitted={startWaiting}/>)
            }
            case 'VOTE': {
                return (<PlayerVote gameId={gameId} onVoteSubmit={startWaiting}/>)
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
        <Header gameId={gameId} playerName={playerName} onCancel={deletePlayer} confirmModalContent={`This will permanently remove you from the game (${gameId})`} />
        {!waiting && renderComponent()}
        {waiting && <p>waiting...</p>}
        </>
    )
}

export default Player;