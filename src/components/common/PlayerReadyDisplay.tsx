import React, { useEffect, useState } from "react";
import { PlayerData, Player } from "../types/playerDataTypes";
import PlayerDisplay from "./PlayerDisplay";
import "../../styles/player-display.css";

interface PlayerReadyDisplayProps {
    players: PlayerData[];
    showStatus?: boolean;
}

const PlayerReadyDisplay: React.FC<PlayerReadyDisplayProps> = ({
    players,
    showStatus = true,
}) => {
    const playerSlots = []; // Array to hold player components

    // Add existing players to the slots
    for (let i = 0; i < players.length; i++) {
        playerSlots.push(
            <PlayerDisplay
                key={players[i].player.playerId}
                player={players[i]}
                showStatus={showStatus}
            />
        );
    }

    return (
        <>
            <div className="container">
                <div className="player-ready-display">{playerSlots}</div>
            </div>
        </>
    );
};

export default PlayerReadyDisplay;
