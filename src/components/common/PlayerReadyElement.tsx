import React from "react";
import { PlayerData } from "../types/playerDataTypes";
import he from "he";
import LilGuy from "../join/LilGuy";

interface PlayerReadyRisplayProps {
    player: PlayerData;
    showStatus?: boolean;
}

const PlayerReadyElement: React.FC<PlayerReadyRisplayProps> = ({
    player,
    showStatus = true,
}) => {
    return (
        <>
            <div
                className={`player-ready-element ${
                    showStatus &&
                    (player.ready ? "player-ready" : "player-wait")
                }`}
            >
                <LilGuy
                    lilGuyIndex={player.player.shape}
                    fillColor={player.player.color}
                    isSelected={false}
                />
                <p>{he.decode(player.player.name)}</p>
            </div>
        </>
    );
};

export default PlayerReadyElement;
