import React, { useState, useEffect } from 'react';
import PlayerHeader from './PlayerHeader';
import PlayerQuestion from './PlayerQuestion';


interface PlayerProps {
    gameId: string;
    gameState: string;
    playerName: playerName;
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
            default: { 
               
            } 
         } 
    }

    return (
        <>
        <PlayerHeader gameId={gameId} playerName={playerName} onCancelPlayer={onCancelPlayer} />
        {!waiting && renderComponent()}
        {waiting && <p>waiting for everyone else to submit their questions...</p>}
        </>
    )
}

export default Player;