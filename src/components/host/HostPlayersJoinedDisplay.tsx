import React from "react";
import { PlayerData } from "../types/playerDataTypes";
import PlayerDisplay from "../common/PlayerDisplay";

interface HostPlayersJoinedDisplayProps {
    playerData: PlayerData[];
}

const HostPlayersJoinedDisplay: React.FC<HostPlayersJoinedDisplayProps> = ({
    playerData,
}) => {

    const playerDisplays = [];

    for (let i = 0; i < playerData.length; i++) {
        playerDisplays.push(
            <PlayerDisplay
                key={playerData[i].player.playerId}
                player={playerData[i]}
                showStatus={false}
            />
        );
    }

    return (
        <>
            <div className="lobby-players-joined">{playerDisplays}</div>
        </>
    );
};

export default HostPlayersJoinedDisplay;
