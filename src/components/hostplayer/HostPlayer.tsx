import React from "react";
import { GameData } from "../types/GameDataTypes";
import Header from "../common/Header";
import { deleteGameApi } from "../../api/gameApi";
import Player from "../player/Player";
import { useGame } from "../../contexts/GameContext";

interface HostPlayerProps {
    playerId: string;
    onCancelHostPlayer: (message?: string) => void;
}

const HostPlayer: React.FC<HostPlayerProps> = ({ playerId, onCancelHostPlayer}) => {

    const { gameData } = useGame();

    const deleteGame = async () => {
        try {
            await deleteGameApi(gameData.gameId);
            onCancelHostPlayer(); //Notify parent that the host/player is cancelled
        } catch (error) {
            console.error("Error deleting game", error);
        }
    };

    return (
        <>
            <Player
                playerId={playerId}
                onCancelPlayer={deleteGame} 
                isHostPlayer={true}
            />
        </>
    )

}

export default HostPlayer;