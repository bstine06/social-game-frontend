import React, { useState } from "react";
const frontendUrl = process.env.REACT_APP_FRONTEND_URL;
import { PlayerData } from "../types/playerDataTypes";
import PlayerReadyDisplay from "../common/PlayerReadyDisplay";
import QRCodeGenerator from "./QRCodeGenerator";
import HostPlayersJoinedDisplay from "./HostPlayersJoinedDisplay";

// Define the type for the props
interface HostLobbyProps {
  gameId: string;
  players: PlayerData[];
  onStartGame: () => void;
}

const HostLobby: React.FC<HostLobbyProps> = ({
    gameId,
    players,
    onStartGame,
}) => {
    return (
        <>
            <div className="two-three-container">
                <div className="container expand-to-fit">
                    <QRCodeGenerator gameId={gameId} />
                </div>
                <div className="container expand-to-fit top-align">
                    <HostPlayersJoinedDisplay playerData={players}/>
                </div>
            </div>
        </>
    );
};

export default HostLobby;
