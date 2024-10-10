import React from "react";
import { PlayerData } from "../types/playerDataTypes";

interface DisplayPlayersProps {
    gameState: string;
    players: PlayerData[];
}

const DisplayPlayers: React.FC<DisplayPlayersProps> = ({
    gameState,
    players
}) => {

    return (
        <div>
            {players.map(p => (
                <p key={p.player.playerId}>{p.player.name}</p>
            ))}
        </div>
    );
}

export default DisplayPlayers;