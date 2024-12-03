import React, { useEffect, useState } from 'react';
import { getPlayersInGameApi } from '../../api/playerApi';
import { PlayerData } from '../types/playerDataTypes';
import PlayerDisplay from '../common/PlayerDisplay';

interface HostScoreProps {
    players: PlayerData[];
}

const HostScore: React.FC<HostScoreProps> = ({players}) => {

    return (
        <>
            <div className="container">
                <h2>Final Scores:</h2>
                {[...players]
                    .sort((a, b) => b.player.score - a.player.score)
                    .map((entry) => (
                        <div className="score-row" key={entry.player.playerId}>
                            <PlayerDisplay player={entry.player} />
                            <h2>{entry.player.score}</h2>
                        </div>
                    ))}
            </div>
        </>
    );

}

export default HostScore;