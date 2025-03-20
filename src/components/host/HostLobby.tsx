import React, { useState, useRef, useEffect } from "react";
const frontendUrl = process.env.REACT_APP_FRONTEND_URL;
import { PlayerData } from "../types/playerDataTypes";
import PlayerReadyDisplay from "../common/PlayerReadyDisplay";
import QRCodeGenerator from "./QRCodeGenerator";
import PlayersJoinedDisplay from "../common/PlayersJoinedDisplay";
import StartGame from "../common/StartGame";
import { useSound } from "../../contexts/SoundContext";
import { GameData } from "../types/GameDataTypes";
import { useGame } from "../../contexts/GameContext";

// Define the type for the props
interface HostLobbyProps {
    players: PlayerData[];
    unremovablePlayerId?: string;
}

const HostLobby: React.FC<HostLobbyProps> = ({ players, unremovablePlayerId = null }) => {

    const playerCountRef = useRef<number>(0);
    const { playSound } = useSound();
    const { gameData } = useGame();

    useEffect(() => {
        if (players.length > playerCountRef.current) {
            playSound('playerJoined1');
            playerCountRef.current += 1;
        } else if (players.length < playerCountRef.current) {
            playSound('playerLeft');
            playerCountRef.current -= 1;
        }
    }, [players]);

    return (
        <>
            <div className="two-three-container">
                <div className="container expand-to-fit">
                    <QRCodeGenerator gameId={gameData.gameId} />
                </div>
                <div className="vertical-flex">
                    <div className="container thinner-container expand-to-fit players-joined-container">
                            <PlayersJoinedDisplay
                                playerData={players}
                                gameData={gameData}
                                hostPrivileges={true}
                                unremovablePlayerId={unremovablePlayerId ? unremovablePlayerId : ""}
                            />
                        </div>
                    <StartGame playerCount={players.length} gameData={gameData} />
                </div>
            </div>
        </>
    );
};

export default HostLobby;
