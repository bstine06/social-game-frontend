import React, { useState } from 'react';
import HostLobby from './HostLobby';
import HostHeader from './HostHeader';

interface HostProps {
    gameId: string;
    gameState: string;
    onCancelHost: () => void;
}

const Host: React.FC<HostProps> = ({gameId, gameState, onCancelHost}) => {

    const renderComponent = () => {
        switch(gameState) { 
            case 'LOBBY': { 
               return (
                <HostLobby gameId={gameId} onCancelHost={onCancelHost}/>
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