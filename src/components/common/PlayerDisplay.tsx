import React from "react";
import { PlayerData } from "../types/playerDataTypes";
import he from "he";
import LilGuy from "../join/LilGuy";

interface PlayerDisplayProps {
    player: PlayerData;
    showStatus?: boolean;
}

const PlayerDisplay: React.FC<PlayerDisplayProps> = ({
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
                        <p className="player-name">{he.decode(player.player.name)}</p>
                    </div>
                </>
    );
};

export default PlayerDisplay;
