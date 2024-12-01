import React, { useEffect, useState } from 'react';
import { getPlayersInGameApi } from '../../api/playerApi';

interface HostScoreProps {
    gameId: string;
}

interface PlayerDisplay {
    name: string;
    playerId: string;
    score: number;
}

const HostScore: React.FC<HostScoreProps> = ({gameId}) => {
    const [players, setPlayers] = useState<PlayerDisplay[]>([]);

    useEffect(() => {
        const getPlayersInGame = async (gameId: string) => {
            const playersInGame = await getPlayersInGameApi(gameId);
            setPlayers(playersInGame);
        }

        getPlayersInGame(gameId);
    }, []);

    return (
        <>
        <div className="container">
            <h2>Final Scores:</h2>
            {players.map((player) => (
                <div className="score-row" key={player.playerId}>
                    <h2>{player.name}</h2>
                    <h2>{player.score}</h2>
                </div>
            ))}
        </div>
        </>
    )

}

export default HostScore;