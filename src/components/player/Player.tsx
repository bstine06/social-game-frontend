import React, { useState } from 'react';
import PlayerLobby from './PlayerLobby';
import PlayerHeader from './PlayerHeader';
import PlayerQuestion from './PlayerQuestion';

interface PlayerProps {
    gameId: string;
    gameState: string;
    onCancelPlayer: () => void;
}

const Host: React.FC<HostProps> = ({gameId, gameState, onCancelPlayer}) => {

    const renderComponent = () => {
        switch(gameState) { 
            case 'LOBBY': { 
               return (
                <PlayerLobby gameId={gameId}/>
               ) 
            } 
            case 'QUESTION': { 
               return (
                <PlayerQuestion onCancelHost={onCancelHost}/>
               )
            } 
            default: { 
               
            } 
         } 
    }

    return (
        <>
        <HostHeader gameId={gameId} onCancelHost={onCancelHost} />
        {renderComponent()}
        </>
    )
}

export default Host;