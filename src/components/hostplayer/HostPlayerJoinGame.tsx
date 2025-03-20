import React from "react";
import { GameData } from "../types/GameDataTypes";
import { deleteGameApi } from "../../api/gameApi";
import JoinGame from "../join/JoinGame";
import { useGame } from "../../contexts/GameContext";

interface HostPlayerJoinGameProps {
    onCreatePlayer: () => void; // Function to handle hosting
    onCancelJoin: () => void;
}

const HostPlayerJoinGame: React.FC<HostPlayerJoinGameProps> = ({
    onCreatePlayer,
    onCancelJoin,
}) => {

    const { gameData } = useGame();

    const deleteGame = async () => {
        try {
            await deleteGameApi(gameData.gameId);
            onCancelJoin(); //Notify parent that the host/player is cancelled
        } catch (error) {
            console.error("Error deleting game", error);
        }
    };

    return (
        <JoinGame 
            onCreatePlayer={onCreatePlayer}
            onCancelJoin={deleteGame}
        />
    );

}

export default HostPlayerJoinGame;