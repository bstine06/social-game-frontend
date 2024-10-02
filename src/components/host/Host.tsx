import React, { useState } from 'react';
import HostLobby from './HostLobby';
import HostHeader from './HostHeader';
import HostQuestion from './HostQuestion';

interface HostProps {
    gameId: string;
    gameState: string;
    onCancelHost: () => void;
    onStartGame: () => void;
}

const Host: React.FC<HostProps> = ({gameId, gameState, onCancelHost, onStartGame}) => {

    const renderComponent = () => {
        switch(gameState) { 
            case 'LOBBY': { 
               return (
                <HostLobby gameId={gameId} onCancelHost={onCancelHost} onStartGame={onStartGame}/>
               ) 
            } 
            case 'QUESTION': { 
               return (
                <HostQuestion onCancelHost={onCancelHost}/>
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