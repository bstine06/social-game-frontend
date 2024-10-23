import React, { useEffect, useState } from "react";
import { PlayerData, Player } from "../types/playerDataTypes";
import PlayerDisplay from "./PlayerDisplay";
import "../../styles/playerDisplay.css";

interface PlayerReadyDisplayProps {
  players: PlayerData[];
  showStatus? : boolean;
  showPlaceHolders? : boolean;
}

const PlayerReadyDisplay: React.FC<PlayerReadyDisplayProps> = ({
    players,
    showStatus = true,
    showPlaceHolders = false
}) => {
    const totalSlots = 8; // Total slots to display
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

    // Fill the remaining slots with PlaceHolderPlayer
    for (let i = players.length; i < totalSlots; i++) {
        const placeHolderPlayerData = {
          player: {
            playerId: '',
            name: '',
            shape: -1,
            color: '',
          },
          ready: false
        }
        playerSlots.push(<PlayerDisplay key={`placeholder-${i}`} player={placeHolderPlayerData} showStatus={false} />);
    }

    return <div className="player-ready-display">{playerSlots}</div>;
};

export default PlayerReadyDisplay;
