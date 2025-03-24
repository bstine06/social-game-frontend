import React from "react";
import { Player } from "../types/playerDataTypes";
import he from "he";
import LilGuy from "../join/LilGuy";

interface PlayerDisplayProps {
    player: Player;
    isReady?: boolean;
}

const PlayerDisplay: React.FC<PlayerDisplayProps> = ({
    player,
    isReady = false
}) => {

    return (
        <>
                    <div
                        className={`player-ready-element ${
                            isReady ? "player-ready" : ""
                        }`}
                        style={player.playerId==='unknown'?{opacity:'0'}:{}}
                    >
                        <LilGuy
                            lilGuyIndex={player.shape}
                            fillColor={player.color}
                            isSelected={false}
                        />
                        <p className="player-name">{he.decode(player.name)}</p>
                    </div>
                </>
    );
};

export default PlayerDisplay;
