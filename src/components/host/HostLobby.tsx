import React, { useState } from "react";
const frontendUrl = process.env.REACT_APP_FRONTEND_URL;
import { PlayerData } from "../types/playerDataTypes";
import PlayerReadyDisplay from "../common/PlayerReadyDisplay";
import QRCodeGenerator from "./QRCodeGenerator";
import PlayersJoinedDisplay from "../common/PlayersJoinedDisplay";
import StartGame from "../common/StartGame";

// Define the type for the props
interface HostLobbyProps {
    gameId: string;
    players: PlayerData[];
}

const HostLobby: React.FC<HostLobbyProps> = ({ gameId, players }) => {
    return (
        <>
            <div className="two-three-container">
                <div className="container expand-to-fit">
                    <QRCodeGenerator gameId={gameId} />
                </div>
                <div className="vertical-flex">
                    <div className="container thinner-container expand-to-fit">
                            <PlayersJoinedDisplay
                                playerData={players}
                                hostPrivileges={true}
                            />
                        </div>
                    <StartGame playerCount={players.length} gameId={gameId} />
                </div>
            </div>
        </>
    );
};

export default HostLobby;
