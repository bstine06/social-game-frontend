import React, { useState, useRef, useEffect } from "react";
const frontendUrl = process.env.REACT_APP_FRONTEND_URL;
import { PlayerData } from "../types/playerDataTypes";
import PlayerReadyDisplay from "../common/PlayerReadyDisplay";
import QRCodeGenerator from "./QRCodeGenerator";
import PlayersJoinedDisplay from "../common/PlayersJoinedDisplay";
import StartGame from "../common/StartGame";
import { useSound } from "../../utils/SoundContext";
import { GameData } from "../types/GameDataTypes";

// Define the type for the props
interface HostLobbyProps {
    gameData: GameData;
    players: PlayerData[];
}

const HostLobby: React.FC<HostLobbyProps> = ({ gameData, players }) => {

    const playerCountRef = useRef<number>(0);
    const { playSound } = useSound();

    useEffect(() => {
        if (players.length > playerCountRef.current) {
            playSound('playerJoined');
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
                                hostPrivileges={true}
                            />
                        </div>
                    <StartGame playerCount={players.length} gameData={gameData} />
                </div>
            </div>
        </>
    );
};

export default HostLobby;
