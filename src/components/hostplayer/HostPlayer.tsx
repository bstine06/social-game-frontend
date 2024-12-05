import React from "react";
import { GameData } from "../types/GameDataTypes";
import Header from "../common/Header";
import { deleteGameApi } from "../../api/gameApi";
import Player from "../player/Player";

interface HostPlayerProps {
    gameData: GameData;
    playerId: string;
    onCancelHostPlayer: (message?: string) => void;
}

const HostPlayer: React.FC<HostPlayerProps> = ({gameData, playerId, onCancelHostPlayer}) => {

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
         <Player gameData={gameData}
                    playerId={playerId}
                    onCancelPlayer={deleteGame} 
                    isHostPlayer={true}
                    />
        </>
    )

}

export default HostPlayer;