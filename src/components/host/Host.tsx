import React, { useEffect, useState } from 'react';
import HostLobby from './HostLobby';
import Header from '../common/Header';
import HostQuestion from './HostQuestion';
import HostAnswer from './HostAnswer';
import HostDisplayBallot from './HostDisplayBallot';
import HostScore from './HostScore';
import { deleteGameApi } from '../../api/gameApi';

interface HostProps {
    gameId: string;
    gameState: string;
    onCancelHost: () => void;
    onStartGame: () => void;
}

const Host: React.FC<HostProps> = ({gameId, gameState, onCancelHost, onStartGame}) => {

    const renderComponent = () => {
        switch (gameState) {
          case "LOBBY": {
            return (
              <HostLobby
                gameId={gameId}
                onStartGame={onStartGame}
              />
            );
          }
          case "QUESTION": 
            return <HostQuestion />;
          case "ASSIGN": 
            return <p>Loading...</p>;
          case "ANSWER": 
            return <HostAnswer />;
          case "FIND_BALLOT": 
            return <p>Loading...</p>;
          case "DISPLAY_BALLOT":
          case "VOTE":
                return <HostDisplayBallot gameId={gameId} displayingVotes={false} />;
          case "DISPLAY_VOTES":
                return <HostDisplayBallot gameId={gameId} displayingVotes={true} />;
          case "SCORE":
                return <HostScore gameId={gameId}/>
          default: {
          }
        } 
    }

    const deleteGame = async () => {
        try {
          await deleteGameApi(gameId);
          onCancelHost(); //Notify parent that the host is cancelled
        } catch (error) {
          console.error("Error deleting game", error);
        }
      };

    return (
        <>
        <Header gameId={gameId} onCancel={deleteGame} confirmModalContent={`This will delete the game (${gameId})`}/>
        {renderComponent()}
        </>
    )
}

export default Host;