import React from "react";
import { PlayerData } from "../types/playerDataTypes";
import PlayerDisplay from "../common/PlayerDisplay";

interface PlayerScoreProps {
    players: PlayerData[];
}

const PlayerScore: React.FC<PlayerScoreProps> = ({ players }) => {
    return (
        <div className="container">
            <h2>Final Scores:</h2>
            {[...players]
                .sort((a, b) => b.player.score - a.player.score)
                .map((entry) => (
                    <div className="score-row" key={entry.player.playerId}>
                        <PlayerDisplay player={entry.player} />
                        <h2 className="score-display">{entry.player.score}</h2>
                    </div>
                ))}
        </div>
    );
};

export default PlayerScore;
