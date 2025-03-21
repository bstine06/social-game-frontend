import React, { useEffect, useState } from 'react';
import { getPlayersInGameApi } from '../../api/playerApi';
import { PlayerData } from '../types/playerDataTypes';
import PlayerDisplay from '../common/PlayerDisplay';
import { updateGameStateApi } from '../../api/gameApi';
import { useGame } from '../../contexts/GameContext';

interface HostScoreProps {
    players: PlayerData[];
}

const HostScore: React.FC<HostScoreProps> = ({players}) => {

    const { gameData } = useGame();

    useEffect(() => {
              const rootElement = document.getElementById("root");
              if (rootElement) {
                          rootElement.classList.add('dots');
              }
          }, []);

    const handleContinue = async () => {
        await updateGameStateApi(gameData.gameId);
    }

    return (
        <>
            <div className="container">
                <h2>Final Scores:</h2>
                {[...players]
                    .sort((a, b) => b.player.score - a.player.score)
                    .map((entry) => (
                        <div className="score-row" key={entry.player.playerId}>
                            <PlayerDisplay player={entry.player} />
                            <h2 className='score-display'>{entry.player.score}</h2>
                        </div>
                    ))}
            </div>
            <div
                className={`container clickable`}
                onClick={handleContinue}
            >
                    <p className="subheading one-line">
                        CONTINUE TO LOBBY
                    </p>
            </div>
        </>
    );

}

export default HostScore;