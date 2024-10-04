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
        <div className="score-players">
            {players.map((player) => (
                <div className="score-row" key={player.playerId}>
                    <p>{player.name}</p>
                    <p>{player.score}</p>
                </div>
            ))}
        </div>
        </>
    )

}

export default HostScore;